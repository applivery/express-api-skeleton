'use strict'
const SubSample = require('../models/subSample.model')
const { omit } = require('lodash')
const debug = require('debug')('AP:Service:SubSample')

exports.list = async ({ sample, query }) => {
  debug('list', { query })
  return await SubSample.list({ sample, query })
}
exports.get = async ({ id }) => {
  debug('get', { id })
  return await SubSample.get(id)
}
exports.create = async ({ sample, data }) => {
  debug('create', { data })
  data.sample = sample._id
  const item = new SubSample(data)
  const savedItem = await item.save()
  return savedItem
}
exports.replace = async ({ subSample, data }) => {
  debug('replace', { subSample })
  const newSubSample = new SubSample(data)
  const newSubSampleObject = omit(newSubSample.toObject(), '_id')
  await subSample.update(newSubSampleObject, { override: true, upsert: true })
  const savedItem = await SubSample.findById(subSample._id)
  return savedItem
}
exports.update = async ({ subSample, data }) => {
  debug('update', { subSample, data })
  const newItem = Object.assign(subSample, data)
  const savedItem = await newItem.save()
  return savedItem
}
exports.remove = async ({ subSample }) => {
  debug('remove', { subSample })
  return await subSample.remove()
}
