const mongoose = require('mongoose')
const secrets = require('../../secrets')
const debug = require('debug')('AP:Utils:Mongoose')
mongoose.Promise = global.Promise

function generateUri36() {
  let uri = `mongodb+srv://`
  uri += `${secrets.mongo.user}:${secrets.mongo.password}@`
  uri += `${secrets.mongo.server}/${secrets.mongo.database}`
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
