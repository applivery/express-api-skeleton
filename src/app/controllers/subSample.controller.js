'use strict'
const SubSampleService = require('../services/subSample.service')
const debug = require('debug')('AP:Controller:SubSample')

async function getSubSamples(req, res) {
  debug('getSubSamples')
  return await SubSampleService.getSubSamples({ sample: req.entities.sample })
}
async function addSubSample(req, res) {
  debug('addSubSample')
  return await SubSampleService.addSubSample({
    sample: req.entities.sample,
    data: req.body
  })
}
async function getSubSample(req, res) {
  debug('getSubSample')
  return req.entities.subSample
}
async function updateSubSample(req, res) {
  debug('updateSubSample')
  return await SubSampleService.updateSubSample({
    sample: req.entities.sample,
    subSample: req.entities.subSample,
    data: req.body
  })
}
async function deleteSubSample(req, res) {
  debug('deleteSubSample')
  return await SubSampleService.deleteSubSample({
    sample: req.entities.sample,
    subSample: req.entities.subSample
  })
}

module.exports = {
  getSubSamples,
  addSubSample,
  getSubSample,
  updateSubSample,
  deleteSubSample
}
