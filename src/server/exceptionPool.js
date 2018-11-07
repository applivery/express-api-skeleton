const { ExceptionPool } = require('express-deliver')
const debug = require('debug')('AP:ExceptionPool')

const exceptionPool = new ExceptionPool({
  ParamNotFound: {
    code: 4000,
    message: `Param not found`,
    statusCode: 422
  },
  EntityNotFound: {
    code: 4001,
    message: `Entity not found`,
    statusCode: 422
  }
})

exceptionPool.add('ValidationError', {
  code: 3000,
  message: 'Validation Error',
  conversion: {
    check: err => err.message.indexOf('validation failed:') > 0,
    data: err => err.message
  }
})

module.exports = exceptionPool
