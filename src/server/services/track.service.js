'use strict'
const TrackModel = require('../models/track.model')
const debug = require('debug')('AP:Service:Track')

async function getTracks({ limit }) {
  debug('getTracks', { limit })
  const query = {}
  const sort = { _id: -1 }
  if (!limit) limit = 100
  return await TrackModel.paginate(query, { page: 1, limit, sort })
}
async function addTrack({ data }) {
  debug('addTrack')
  const item = new TrackModel(data)
  await item.save()
  return item
}
async function getTrack({ id }) {
  debug('getTrack', { id })
  return await TrackModel.findOne({ _id: id })
}
async function deleteTrack({ track }) {
  debug('deleteTrack', { track })
  await track.remove()
  return {}
}

module.exports = {
  getTracks,
  addTrack,
  getTrack,
  deleteTrack
}
