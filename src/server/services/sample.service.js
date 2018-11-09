'use strict'
const SampleModel = require('../models/sample.model')
const debug = require('debug')('AP:Service:Sample')

async function getSamples({ limit }) {
  debug('getSamples', { limit })
  const query = {}
  const sort = { _id: -1 }
  if (!limit) limit = 100
  return await SampleModel.paginate(query, { page: 1, limit, sort })
}
async function addSample({ data }) {
  debug('addSample', { data })
  const item = new SampleModel(data)
  await item.save()
  return item
}
async function getSample({ id }) {
  debug('getSample', { id })
  return await SampleModel.findOne({ _id: id })
}
async function updateSample({ sample, data }) {
  debug('updateSample', { sample, data })
  const query = { _id: sample._id }
  const options = { new: true }
  delete data.createdAt
  const item = await SampleModel.findOneAndUpdate(query, data, options)
  return item
}
async function deleteSample({ sample }) {
  debug('deleteSample', { sample })
  await sample.remove()
  return {}
}

module.exports = {
  getSamples,
  addSample,
  getSample,
  updateSample,
  deleteSample
}
