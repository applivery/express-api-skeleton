'use strict'
const express = require('express')
const expressDeliver = require('express-deliver')
const SubSampleRoutes = require('./subSample.route')
const SampleController = require('../../controllers/sample.controller')
const { ensureSampleExists } = require('../../middlewares/entities.middleware')

const router = express.Router()
expressDeliver(router)

/**
 * @swagger
 *
 * /sample:
 *   get:
 *     summary: Get list of samples
 *     description: Get list of samples
 *     tags: [Sample]
 *     produces:
 *     - application/json
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return array of samples
 *         schema:
 *           $ref: '#/definitions/SamplesResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.get('/', SampleController.getSamples)

/**
 * @swagger
 *
 * /sample:
 *   post:
 *     summary: Add new sample
 *     description: Add new sample
 *     tags: [Sample]
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/SampleData'
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return sample created
 *         schema:
 *           $ref: '#/definitions/SampleResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.post('/', SampleController.addSample)

/**
 * @swagger
 *
 * /sample/{sampleId}:
 *   get:
 *     summary: Get sample
 *     description: Get sample
 *     tags: [Sample]
 *     produces:
 *     - application/json
 *     parameters:
 *     - $ref: '#/parameters/sampleId'
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return sample
 *         schema:
 *           $ref: '#/definitions/SampleResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.get(
  '/:sampleId',
  ensureSampleExists,
  // md_entities.ensureUserIsSampleManager,
  SampleController.getSample
)

/**
 * @swagger
 *
 * /sample/{sampleId}:
 *   put:
 *     summary: Update sample
 *     description: Update sample
 *     tags: [Sample]
 *     produces:
 *     - application/json
 *     parameters:
 *     - $ref: '#/parameters/sampleId'
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/SampleData'
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return sample updated
 *         schema:
 *           $ref: '#/definitions/SampleResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.put(
  '/:sampleId',
  ensureSampleExists,
  // md_entities.ensureUserIsSampleManager,
  SampleController.updateSample
)

/**
 * @swagger
 *
 * /sample/{sampleId}:
 *   delete:
 *     summary: Delete sample
 *     description: Delete sample
 *     tags: [Sample]
 *     produces:
 *     - application/json
 *     parameters:
 *     - $ref: '#/parameters/sampleId'
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return empty object
 *         schema:
 *           $ref: '#/definitions/DeleteResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.delete(
  '/:sampleId',
  ensureSampleExists,
  // md_entities.ensureUserIsSampleManager,
  SampleController.deleteSample
)

router.use(
  '/:sampleId/subSample',
  ensureSampleExists,
  // md_entities.ensureUserIsClientManager,
  SubSampleRoutes
)

module.exports = router
