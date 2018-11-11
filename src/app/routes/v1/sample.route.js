'use strict'
const express = require('express')
const validate = require('express-validation')
const expressDeliver = require('express-deliver')
const SubSampleRoutes = require('./subSample.route')
const controller = require('../../controllers/sample.controller')
const {
  listSamples,
  createSample,
  replaceSample,
  updateSample,
  deleteSample
} = require('../../validations/sample.validation')

const router = express.Router()
expressDeliver(router)

/**
 * Load user when API with userId route parameter is hit
 */
router.param('sampleId', controller.load)

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
router.get('/', validate(listSamples), controller.list)

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
router.post('/', validate(createSample), controller.create)

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
router.get('/:sampleId', controller.get)

/**
 * @swagger
 *
 * /sample/{sampleId}:
 *   put:
 *     summary: Replace sample
 *     description: Replace sample
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
router.put('/:sampleId', validate(replaceSample), controller.replace)

/**
 * @swagger
 *
 * /sample/{sampleId}:
 *   patch:
 *     summary: Update partial sample
 *     description: Update partial sample
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
router.patch('/:sampleId', validate(updateSample), controller.update)

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
router.delete('/:sampleId', validate(deleteSample), controller.remove)

router.use('/:sampleId/subSamples', SubSampleRoutes)

module.exports = router
