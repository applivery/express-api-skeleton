'use strict'
// const debug = require('debug')('AP:Controller:Status')
const StatusService = require('../services/status')

async function status(req, res) {
  return StatusService.getStatus()
}

module.exports = {
  status
}
