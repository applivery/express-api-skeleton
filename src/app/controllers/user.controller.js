const httpStatus = require('http-status')
const service = require('../services/user.service')
const { EntityNotFound } = require('../exceptionPool')
const debug = require('debug')('AP:Controller:User')

/**
 * Load user and append to req.
 * @public
 */
exports.load = (req, res, next, id) => {
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
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  const query = req.query
  const users = await service.list({ query })
  users.docs = users.docs.map(item => item.transform())
  return users
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
  const newItem = await service.create({ data: req.body })
  res.status(httpStatus.CREATED)
  return newItem.transform()
}

/**
 * Replace existing user
 * @public
 */
exports.replace = async (req, res, next) => {
  const { user } = req.locals
  const data = req.body
  const newItem = await service.replace({ user, data })
  return newItem.transform()
}

/**
 * Update existing user
 * @public
 */
exports.update = async (req, res, next) => {
  const { user } = req.locals
  const data = req.body
  const newItem = await service.update({ user, data })
  return newItem.transform()
}

/**
 * Delete user
 * @public
 */
exports.remove = async (req, res, next) => {
  const { user } = req.locals
  await service.remove({ user })
  // res.status(httpStatus.NO_CONTENT)
  return { delete: 'OK' }
}
