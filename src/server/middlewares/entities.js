'user strict'
const { ParamNotFound, EntityNotFound } = require('../exceptionPool')
const SampleService = require('../services/sample')
const SubSampleService = require('../services/subSample')
const debug = require('debug')('AP:Middleware:Entities')

async function loadEntity(param, functionGetItem, req, res, next) {
  debug('loadEntity', param)
  const paramUrl = param + 'Id'
  const itemId = req.params[paramUrl]
  if (!itemId) {
    throw new ParamNotFound({ paramUrl })
  }
  try {
    const item = await functionGetItem({ entity: param, id: itemId })
    if (!item) {
      throw new EntityNotFound({ entity: param, id: itemId })
    }
    if (!req.entities) req.entities = {}
    req.entities[param] = item
    next()
  } catch (err) {
    throw new EntityNotFound({
      entity: param,
      id: itemId,
      err: err.message
    })
  }
}

exports.ensureSampleExists = async function(req, res, next) {
  debug('ensureSampleExists')
  await loadEntity('sample', SampleService.getSample, req, res, next)
}

exports.ensureSubSampleExists = async function(req, res, next) {
  debug('ensureSubSampleExists')
  await loadEntity('subSample', SubSampleService.getSubSample, req, res, next)
}
