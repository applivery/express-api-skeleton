const mongoose = require('mongoose')
const debug = require('debug')('AP:Utils:Mongoose')
mongoose.Promise = global.Promise

require('dotenv').config()
const mongoConfig = {
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  database: process.env.MONGO_DATABASE,
  server: process.env.MONGO_SERVER
}
const devTest = process.env.NODE_ENV === 'test'
if (devTest) {
  const testFile = require('path')
    .basename(global.jasmine.testPath)
    .replace('.spec.js', '')
  mongoConfig.database = 'applivery-test-' + testFile.replace('.', '-')
}
debug('mongoConfig', mongoConfig)

function generateUri36() {
  let uri = `mongodb+srv://`
  uri += `${mongoConfig.user}:${mongoConfig.password}@`
  uri += `${mongoConfig.server}/${mongoConfig.database}`
  uri += `?retryWrites=true`
  return uri
}

const uri = generateUri36()
debug('pre-mongoose-init')
const options = { useNewUrlParser: true }

mongoose
  .connect(
    uri,
    options
  )
  .then(() => {
    debug('Mongo Connection success')
    return null
  })
  .catch(err => {
    debug('Mongo Connection error:', err)
  })
