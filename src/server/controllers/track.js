'use strict'
const TrackService = require('../services/track')
const debug = require('debug')('AP:Controller:Track')

async function getTracks(req, res) {
  debug('getTracks')
  return await TrackService.getTracks({})
}
async function getTrack(req, res) {
  debug('getTrack')
  return req.entities.track
}

module.exports = {
  getTracks,
  getTrack
}
