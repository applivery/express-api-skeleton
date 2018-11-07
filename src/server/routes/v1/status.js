'use strict'
const express = require('express')
const expressDeliver = require('express-deliver')
const StatusController = require('../../controllers/status')

const router = express.Router()
expressDeliver(router)

/**
 * @swagger
 *
 * /status:
 *   get:
 *     summary: Get API status
 *     description: Get API status
 *     tags: [Status]
 *     produces:
 *     - application/json
 *     responses:
 *       200:
 *         description: Return API status
 *         schema:
 *           $ref: '#/definitions/StatusResponse'
 */
router.get('/', StatusController.status)

module.exports = router
