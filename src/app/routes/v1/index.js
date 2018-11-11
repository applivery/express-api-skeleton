'use strict'
const express = require('express')
const expressDeliver = require('express-deliver')
const SampleRoutes = require('./sample.route')
const TrackRoutes = require('./track.route')
const StatusRoutes = require('./status.route')
const SwaggerRoutes = require('./swagger.route')
const userRoutes = require('./user.route')
const authRoutes = require('./auth.route')
const debug = require('debug')('AP:Routes:v1:index')
const { authorize } = require('../../middlewares/auth.middleware')

const router = express.Router()
expressDeliver(router)

router.use('/status', StatusRoutes)
router.use('/doc', SwaggerRoutes)
router.use('/samples', authorize(), SampleRoutes)
router.use('/track', authorize(), TrackRoutes)

router.use('/users', userRoutes)
router.use('/auth', authRoutes)

module.exports = router
