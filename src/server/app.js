const expressDeliver = require('express-deliver')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const Debug = require('debug')
const debug = require('debug')('AP:Index')
const routes = require('./routes')

const devMode = process.env.NODE_ENV === 'development'
if (devMode) {
  Debug.enable('AP:*')
} else {
  Debug.disable()
}

require('./setup/mongoose')

const app = express()

expressDeliver(app, {
  exceptionPool: require('./exceptionPool.js'),
  onError(err, req, res) {
    debug(err.name, err)
  }
})
// Ini middlewares
app.use(cors())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('*', (req, res, next) => {
  debug('Request was made to: ' + req.method + ':' + req.originalUrl)
  return next()
})
app.use('/', routes)
// End middlewares
expressDeliver.errorHandler(app)

module.exports = app
