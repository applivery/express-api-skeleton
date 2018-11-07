'use strict'
const ConnectionLib = require('../lib/ConnectionLib')
const packageJson = require('../../package.json')
const debug = require('debug')('AP:Service:Status')

async function getMyIp() {
  const data = await ConnectionLib.send({
    url: 'http://ipinfo.io/ip',
    method: 'get'
  })

  return data.replace('\n', '')
}

async function getStatus() {
  const ip = await getMyIp()
  return {
    name: packageJson.name,
    version: packageJson.version,
    ip
  }
}

module.exports = {
  getStatus
}
