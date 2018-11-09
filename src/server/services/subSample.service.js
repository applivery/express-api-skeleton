'use strict'
const SubSampleModel = require('../models/subSample.model')
const debug = require('debug')('AP:Service:SubSample')

async function getSubSamples({ sample, limit }) {
  debug('getSubSamples', { sample, limit })
  const query = { sample }
  const sort = { _id: -1 }
  if (!limit) limit = 100
  return await SubSampleModel.paginate(query, { page: 1, limit, sort })
}
async function addSubSample({ sample, data }) {
  debug('addSubSample', { sample, data })
  const item = new SubSampleModel(data)
  item.sample = sample._id
  item.save()
  sample.subSamples.push(item)
  await sample.save()
  return item
}
async function getSubSample({ id }) {
  debug('getSubSample', { id })
  return await SubSampleModel.findOne({ _id: id })
}
async function updateSubSample({ subSample, data }) {
  debug('updateSubSample', { subSample, data })
  const query = { _id: subSample._id }
  const options = { new: true }
  delete data.createdAt
  const item = await SubSampleModel.findOneAndUpdate(query, data, options)
  return item
}
async function deleteSubSample({ subSample }) {
  debug('deleteSubSample', { subSample })
  await subSample.remove()
  return {}
}

module.exports = {
  getSubSamples,
  addSubSample,
  getSubSample,
  updateSubSample,
  deleteSubSample
}
