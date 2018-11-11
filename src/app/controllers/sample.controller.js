'use strict'
const service = require('../services/sample.service')
const httpStatus = require('http-status')
const debug = require('debug')('AP:Controller:Sample')

exports.load = (req, res, next, id) => {
  service
    .get({ id })
    .then(sample => {
      debug('sample', sample)
      if (!sample) throw new EntityNotFound({ entity: 'sample', id: id })
      req.locals = { sample }
      return next()
    })
    .catch(next)
}

exports.list = async (req, res) => {
  const query = req.query
  const items = await service.list({ query })
  items.docs = items.docs.map(item => item.transform())
  return items
}
exports.get = async (req, res) => req.locals.sample.transform()
exports.create = async (req, res) => {
  const newItem = await service.create({ data: req.body })
  res.status(httpStatus.CREATED)
  return newItem.transform()
}
exports.replace = async (req, res) => {
  const { sample } = req.locals
  const data = req.body
  const newItem = await service.replace({ sample, data })
  return newItem.transform()
}
exports.update = async (req, res) => {
  const { sample } = req.locals
  const data = req.body
  const newItem = await service.update({ sample, data })
  return newItem.transform()
}
exports.remove = async (req, res) => {
  const { sample } = req.locals
  await service.remove({ sample })
  // res.status(httpStatus.NO_CONTENT)
  return { delete: 'OK' }
}
