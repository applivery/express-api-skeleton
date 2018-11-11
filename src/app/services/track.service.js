'use strict'
const Track = require('../models/track.model')
const debug = require('debug')('AP:Service:Track')

exports.list = async ({ query }) => {
  debug('list', { query })
  return await Track.list({ query })
}
exports.get = async ({ id }) => {
  debug('get', { id })
  return await Track.get(id)
}
exports.create = async ({ data }) => {
  debug('create', { data })
  const item = new Track(data)
  const savedItem = await item.save()
  return savedItem
}
exports.remove = async ({ track }) => {
  debug('remove', { track })
  return await track.remove()
}
