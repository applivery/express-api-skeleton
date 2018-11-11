'use strict'
const express = require('express')
const validate = require('express-validation')
const expressDeliver = require('express-deliver')
const controller = require('../../controllers/subSample.controller')
const {
  listSubSamples,
  createSubSample,
  replaceSubSample,
  updateSubSample,
  deleteSubSample
} = require('../../validations/subSample.validation')

const router = express.Router()
expressDeliver(router)

/**
 * Load user when API with userId route parameter is hit
 */
router.param('subSampleId', controller.load)

/**
 * @swagger
 *
 * /sample/{sampleId}/subSample:
 *   get:
 *     summary: Get list of subSamples
 *     description: Get list of subSamples
 *     tags: [SubSample]
 *     produces:
 *     - application/json
 *     parameters:
 *     - $ref: '#/parameters/sampleId'
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return array of subSamples
 *         schema:
 *           $ref: '#/definitions/SubSamplesResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.get('/', validate(listSubSamples), controller.list)

/**
 * @swagger
 *
 * /sample/{sampleId}/subSample:
 *   post:
 *     summary: Add new subSample
 *     description: Add new subSample
 *     tags: [SubSample]
 *     produces:
 *     - application/json
 *     parameters:
 *     - $ref: '#/parameters/sampleId'
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/SubSampleData'
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return subSample created
 *         schema:
 *           $ref: '#/definitions/SubSampleResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.post('/', validate(createSubSample), controller.create)

/**
 * @swagger
 *
 * /sample/{sampleId}/subSample/{subSampleId}:
 *   get:
 *     summary: Get subSample
 *     description: Get subSample
 *     tags: [SubSample]
 *     produces:
 *     - application/json
 *     parameters:
 *     - $ref: '#/parameters/sampleId'
 *     - $ref: '#/parameters/subSampleId'
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return subSample
 *         schema:
 *           $ref: '#/definitions/SubSampleResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.get('/:subSampleId', controller.get)

/**
 * @swagger
 *
 * /sample/{sampleId}/subSample/{subSampleId}:
 *   put:
 *     summary: Update subSample
 *     description: Update subSample
 *     tags: [SubSample]
 *     produces:
 *     - application/json
 *     parameters:
 *     - $ref: '#/parameters/sampleId'
 *     - $ref: '#/parameters/subSampleId'
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/SubSampleData'
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return subSample updated
 *         schema:
 *           $ref: '#/definitions/SubSampleResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.put('/:subSampleId', validate(replaceSubSample), controller.replace)

/**
 * @swagger
 *
 * /sample/{sampleId}/subSample/{subSampleId}:
 *   patch:
 *     summary: Update subSample
 *     description: Update subSample
 *     tags: [SubSample]
 *     produces:
 *     - application/json
 *     parameters:
 *     - $ref: '#/parameters/sampleId'
 *     - $ref: '#/parameters/subSampleId'
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/SubSampleData'
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return subSample updated
 *         schema:
 *           $ref: '#/definitions/SubSampleResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.patch('/:subSampleId', validate(updateSubSample), controller.update)

/**
 * @swagger
 *
 * /sample/{sampleId}/subSample/{subSampleId}:
 *   delete:
 *     summary: Delete subSample
 *     description: Delete subSample
 *     tags: [SubSample]
 *     produces:
 *     - application/json
 *     parameters:
 *     - $ref: '#/parameters/subSampleId'
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
router.delete('/:subSampleId', validate(deleteSubSample), controller.remove)

module.exports = router
