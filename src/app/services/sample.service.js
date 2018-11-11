'use strict'
const Sample = require('../models/sample.model')
const { omit } = require('lodash')
const debug = require('debug')('AP:Service:Sample')

exports.list = async ({ query }) => {
  debug('list', { query })
  return await Sample.list({ query })
}
exports.get = async ({ id }) => {
  debug('get', { id })
  return await Sample.get(id)
}
exports.create = async ({ data }) => {
  debug('create', { data })
  const item = new Sample(data)
  const savedItem = await item.save()
  return savedItem
}
exports.replace = async ({ sample, data }) => {
  debug('replace', { sample })
  const newSample = new Sample(data)
  const newSampleObject = omit(newSample.toObject(), '_id')
  await sample.update(newSampleObject, { override: true, upsert: true })
  const savedItem = await Sample.findById(sample._id)
  return savedItem
}
exports.update = async ({ sample, data }) => {
  debug('update', { sample, data })
  const newItem = Object.assign(sample, data)
  const savedItem = await newItem.save()
  return savedItem
}
exports.remove = async ({ sample }) => {
  debug('remove', { sample })
  return await sample.remove()
}
