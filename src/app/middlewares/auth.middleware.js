const Promise = require('bluebird')
const passport = require('passport')
const User = require('../models/user.model')

const {
  NoAuthToken,
  AuthForbidden,
  InvalidToken,
  TokenExpired
} = require('../exceptionPool')
const debug = require('debug')('AP:Middleware:Auth')

const ADMIN = 'admin'
const LOGGED_USER = '_loggedUser'

const handleJWT = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info
  const logIn = Promise.promisify(req.logIn)

  try {
    if (error || !user) {
      if (error.message === 'jwt expired') {
        return next(new TokenExpired())
      }
      debug('error.message', error.message)
      throw error
    }
    await logIn(user, { session: false })
  } catch (e) {
    return next(new NoAuthToken())
  }

  if (roles === LOGGED_USER) {
    if (user.role !== 'admin' && req.params.userId !== user._id.toString()) {
      return next(new AuthForbidden())
    }
  } else if (!roles.includes(user.role)) {
    return next(new AuthForbidden())
  } else if (err || !user) {
    return next(new InvalidToken())
  }

  req.user = user

  return next()
}

exports.ADMIN = ADMIN
exports.LOGGED_USER = LOGGED_USER

exports.authorize = (roles = User.roles) => (req, res, next) =>
  passport.authenticate(
    'jwt',
    { session: false },
    handleJWT(req, res, next, roles)
  )(req, res, next)

exports.oAuth = service => passport.authenticate(service, { session: false })
