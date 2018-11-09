const httpStatus = require('http-status')
const service = require('../services/user.service')
const debug = require('debug')('AP:Controller:User')
const { EntityNotFound } = require('../exceptionPool')

/**
 * Load user and append to req.
 * @public
 */
exports.load = (req, res, next, id) => {
  debug('load', { id })
  service
    .get({ id })
    .then(user => {
      debug('user', user)
      if (!user) throw new EntityNotFound({ entity: 'user', id: id })
      req.locals = { user }
      return next()
    })
    .catch(next)
}

/**
 * Get user
 * @public
 */
exports.get = async (req, res) => req.locals.user.transform()

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = async (req, res) => req.user.transform()

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  const savedUser = await service.create({ data: req.body })
  res.status(httpStatus.CREATED)
  return savedUser.transform()
}

/**
 * Replace existing user
 * @public
 */
exports.replace = async (req, res, next) => {
  const { user } = req.locals
  const data = req.body
  const savedUser = await service.replace({ user, data })
  return savedUser.transform()
}

/**
 * Update existing user
 * @public
 */
exports.update = async (req, res, next) => {
  const { user } = req.locals
  const data = req.body
  const savedUser = await service.update({ user, data })
  return savedUser.transform()
}

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  const query = req.query
  const users = await service.list({ query })
  const transformedUsers = users.map(user => user.transform())
  return transformedUsers
}

/**
 * Delete user
 * @public
 */
exports.remove = async (req, res, next) => {
  const { user } = req.locals
  await service.remove({ user })
  res.status(httpStatus.NO_CONTENT)
  return { delete: 'OK' }
}
