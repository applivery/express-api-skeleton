'use strict'
const express = require('express')
const expressDeliver = require('express-deliver')
const TrackController = require('../../controllers/track.controller')
const { ensureTrackExists } = require('../../middlewares/entities.middleware')

const router = express.Router()
expressDeliver(router)

/**
 * @swagger
 *
 * /track:
 *   get:
 *     summary: Get list of tracks
 *     description: Get list of tracks
 *     tags: [Track]
 *     produces:
 *     - application/json
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return array of tracks
 *         schema:
 *           $ref: '#/definitions/TracksResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.get('/', TrackController.getTracks)

/**
 * @swagger
 *
 * /track/{trackId}:
 *   get:
 *     summary: Get track
 *     description: Get track
 *     tags: [Track]
 *     produces:
 *     - application/json
 *     parameters:
 *     - $ref: '#/parameters/trackId'
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return track
 *         schema:
 *           $ref: '#/definitions/TrackResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.get(
  '/:trackId',
  ensureTrackExists,
  // md_entities.ensureUserIsTrackManager,
  TrackController.getTrack
)

module.exports = router
