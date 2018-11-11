'use strict'
const { omit } = require('lodash')
const User = require('../models/user.model')
const debug = require('debug')('AP:Service:User')

/**
 * Get user list
 * @public
 */
exports.list = async ({ query }) => {
  debug('list', { query })
  return await User.list({ query })
}

/**
 * Load user and append to req.
 * @public
 */
exports.get = async ({ id }) => {
  debug('get', { id })
  return await User.get(id)
}

/**
 * Create new user
 * @public
 */
exports.create = async ({ data }) => {
  debug('create', { data })
  try {
    const user = new User(data)
    const savedItem = await user.save()
    return savedItem
  } catch (err) {
    throw User.checkDuplicateEmail(err)
  }
}

/**
 * Replace existing user
 * @public
 */
exports.replace = async ({ user, data }) => {
  debug('replace', { user })
  try {
    const newUser = new User(data)
    const ommitRole = user.role !== 'admin' ? 'role' : ''
    const newUserObject = omit(newUser.toObject(), '_id', ommitRole)

    await user.update(newUserObject, { override: true, upsert: true })
    const savedItem = await User.findById(user._id)
    return savedItem
  } catch (err) {
    throw User.checkDuplicateEmail(err)
  }
}

/**
 * Update existing user
 * @public
 */
exports.update = async ({ user, data }) => {
  debug('update', { user, data })
  try {
    const ommitRole = user.role !== 'admin' ? 'role' : ''
    const updatedUser = omit(data, ommitRole)
    const newItem = Object.assign(user, updatedUser)
    const savedItem = await newItem.save()
    return savedItem
  } catch (err) {
    throw User.checkDuplicateEmail(err)
  }
}

/**
 * Delete user
 * @public
 */
exports.remove = async ({ user }) => {
  debug('remove', { user })
  try {
    return await user.remove()
  } catch (error) {
    throw error
  }
}
