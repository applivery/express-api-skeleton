const expressDeliver = require('express-deliver')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const methodOverride = require('method-override')
const routes = require('./routes')
const tracking = require('./middlewares/tracking.middleware')
const mongoose = require('./setup/mongoose')
const passport = require('passport')
const strategies = require('./setup/passport')
const { logs } = require('./setup/vars')
const Debug = require('debug')
const debug = require('debug')('AP:Index')

const devMode = process.env.NODE_ENV === 'development'
if (devMode) {
  Debug.enable('AP:*')
} else {
  Debug.disable()
}

// open mongoose connection
mongoose.connect()

const app = express()

// request logging. dev: console | production: file
app.use(morgan(logs))

expressDeliver(app, {
  exceptionPool: require('./exceptionPool.js'),
  onError(err, req, res) {
    debug(err.name, err)
  }
})
// Ini middlewares

// parse body params and attache them to req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// gzip compression
app.use(compression())

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// enable authentication
app.use(passport.initialize())
passport.use('jwt', strategies.jwt)
passport.use('facebook', strategies.facebook)
passport.use('google', strategies.google)

// Track all connection in database
app.use(tracking)

// Add router
app.use('/', routes)

// End middlewares
expressDeliver.errorHandler(app)

module.exports = app
