'use strict'
const SampleService = require('../services/sample.service')
const debug = require('debug')('AP:Controller:Sample')

async function getSamples(req, res) {
  debug('register 1')
  const error = { error: 'register' }
  throw error
  debug('getSamples')
  return await SampleService.getSamples({})
}
async function addSample(req, res) {
  debug('addSample')
  return await SampleService.addSample({ data: req.body })
}
async function getSample(req, res) {
  debug('getSample')
  return req.entities.sample
}
async function updateSample(req, res) {
  debug('updateSample')
  return await SampleService.updateSample({
    sample: req.entities.sample,
    data: req.body
  })
}
async function deleteSample(req, res) {
  debug('deleteSample')
  return await SampleService.deleteSample({ sample: req.entities.sample })
}

module.exports = {
  getSamples,
  addSample,
  getSample,
  updateSample,
  deleteSample
}
