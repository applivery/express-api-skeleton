'use strict'
const service = require('../services/track.service')
const debug = require('debug')('AP:Controller:Track')

exports.load = (req, res, next, id) => {
  service
    .get({ id })
    .then(track => {
      debug('track', track)
      if (!track) throw new EntityNotFound({ entity: 'track', id: id })
      req.locals = { track }
      return next()
    })
    .catch(next)
}

exports.list = async (req, res) => {
  debug('getTracks')
  const query = req.query
  const items = await service.list({ query })
  items.docs = items.docs.map(item => item.transform())
  return items
}
exports.get = async (req, res) => req.locals.track.transform()
