const { ExceptionPool } = require('express-deliver')
const expressValidation = require('express-validation')
const { MongoError } = require('mongodb')
const debug = require('debug')('AP:ExceptionPool')

const exceptionPool = new ExceptionPool({
  ParamNotFound: {
    code: 3000,
    message: `Param not found`,
    statusCode: 422
  },
  EntityNotFound: {
    code: 3001,
    message: `Entity not found`,
    statusCode: 422
  },
  Unauthorize: {
    code: 4001,
    message: 'Unauthorize',
    statusCode: 401
  },
  NoAuthToken: {
    code: 4002,
    message: 'No auth token',
    statusCode: 401
  },
  AuthForbidden: {
    code: 4003,
    message: 'Forbidden - You are not allowed to perform this action',
    statusCode: 403
  },
  InvalidToken: {
    code: 4004,
    message: 'Invalid Token',
    statusCode: 401
  },
  TokenExpired: {
    code: 4005,
    message: 'Token Expired',
    statusCode: 401
  },
  Conflict: {
    code: 5001,
    message: 'Unauthorize',
    statusCode: 409
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

exceptionPool.add('ExpressValidationError', {
  code: 3001,
  message: 'Body Validation Error',
  statusCode: 400,
  conversion: {
    check: err => err instanceof expressValidation.ValidationError,
    data: err => {
      return { errors: err.errors, stack: err.stack }
    }
  }
})

exceptionPool.add('MongoError', {
  code: 3002,
  message: 'Database Error',
  statusCode: 500,
  conversion: {
    check: err => err instanceof MongoError,
    data: err => {
      return {
        message: err.message,
        errors: err.errors,
        stack: err.stack
      }
    }
  }
})

exceptionPool.add('TEST', {
  code: 3001,
  message: 'TEST',
  statusCode: 500,
  conversion: {
    check: err => {
      debug('err', {
        type: typeof err,
        instance: err.constructor.name
      })
      return false
    }
  }
})

module.exports = exceptionPool
