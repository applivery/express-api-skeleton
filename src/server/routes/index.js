'use strict'
const express = require('express')
const expressDeliver = require('express-deliver')
const v1Controller = require('./v1')
const debug = require('debug')('AP:Routes:v1')

const router = express.Router()
expressDeliver(router)

router.get('/', async function() {
  debug('GET /v1')
  return 'v1'
})

router.use('/v1', v1Controller)

module.exports = router
