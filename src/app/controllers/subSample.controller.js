'use strict'
const service = require('../services/subSample.service')
const httpStatus = require('http-status')
const debug = require('debug')('AP:Controller:SubSample')

exports.load = (req, res, next, id) => {
  service
    .get({ id })
    .then(subSample => {
      debug('subSample', subSample)
      if (!subSample) throw new EntityNotFound({ entity: 'subSample', id: id })
      req.locals = { subSample }
      return next()
    })
    .catch(next)
}

exports.list = async (req, res) => {
  const query = req.query
  const { sample } = req.locals
  const items = await service.list({ sample, query })
  items.docs = items.docs.map(item => item.transform())
  return items
}
exports.get = async (req, res) => req.locals.subSample.transform()
exports.create = async (req, res) => {
  const { sample } = req.locals
  const newItem = await service.create({ sample, data: req.body })
  res.status(httpStatus.CREATED)
  return newItem.transform()
}
exports.replace = async (req, res) => {
  const { subSample } = req.locals
  const data = req.body
  const newItem = await service.replace({ subSample, data })
  return newItem.transform()
}
exports.update = async (req, res) => {
  const { subSample } = req.locals
  const data = req.body
  const newItem = await service.update({ subSample, data })
  return newItem.transform()
}
exports.remove = async (req, res) => {
  const { subSample } = req.locals
  await service.remove({ subSample })
  // res.status(httpStatus.NO_CONTENT)
  return { delete: 'OK' }
}
