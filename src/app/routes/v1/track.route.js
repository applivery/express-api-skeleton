'use strict'
const express = require('express')
const validate = require('express-validation')
const expressDeliver = require('express-deliver')
const controller = require('../../controllers/track.controller')
const { listTracks } = require('../../validations/track.validation')

const router = express.Router()
expressDeliver(router)

/**
 * Load user when API with userId route parameter is hit
 */
router.param('tackId', controller.load)

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
router.get('/', validate(listTracks), controller.list)

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
router.get('/:trackId', controller.get)

module.exports = router
