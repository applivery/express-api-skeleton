const path = require('path')

require('dotenv').config()

function generateUri36(mongoConfig) {
  let uri = `mongodb+srv://`
  uri += `${mongoConfig.user}:${mongoConfig.password}@`
  uri += `${mongoConfig.server}/${mongoConfig.database}`
  uri += `?retryWrites=true`
  return uri
}

function generateMongoUrl() {
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
  return generateUri36(mongoConfig)
}

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri: generateMongoUrl()
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
}
