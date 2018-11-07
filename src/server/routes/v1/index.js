'use strict'
const express = require('express')
const expressDeliver = require('express-deliver')
const SampleRoutes = require('./sample')
const TrackRoutes = require('./track')
const StatusRoutes = require('./status')
const SwaggerRoutes = require('./swagger')
const debug = require('debug')('AP:Routes:v1:index')

const router = express.Router()
expressDeliver(router)

router.use('/status', StatusRoutes)
router.use('/doc', SwaggerRoutes)
router.use('/sample', SampleRoutes)
router.use('/track', TrackRoutes)

module.exports = router
