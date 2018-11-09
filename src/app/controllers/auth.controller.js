const service = require('../services/auth.service')
const httpStatus = require('http-status')
const debug = require('debug')('AP:Controller:Auth')

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async (req, res) => {
  debug('register')
  const newUser = await service.register({ data: req.body })
  res.status(httpStatus.CREATED)
  return newUser
}

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
  return await service.login({ data: req.body })
}

/**
 * login with an existing user or creates a new one if valid accessToken token
 * Returns jwt token
 * @public
 */
exports.oAuth = async (req, res, next) => {
  const { user } = req
  return await service.oAuth({ user })
}

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async (req, res, next) => {
  return await service.refresh({ data: req.body })
}
