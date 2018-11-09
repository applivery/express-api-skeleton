'use strict'
const express = require('express')
const expressDeliver = require('express-deliver')
const SubSampleController = require('../../controllers/subSample.controller')
const {
  ensureSubSampleExists
} = require('../../middlewares/entities.middleware')

const router = express.Router()
expressDeliver(router)

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
router.get('/', SubSampleController.getSubSamples)

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
router.post('/', SubSampleController.addSubSample)

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
router.get(
  '/:subSampleId',
  ensureSubSampleExists,
  // md_entities.ensureUserIsSubSampleManager,
  SubSampleController.getSubSample
)

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
router.put(
  '/:subSampleId',
  ensureSubSampleExists,
  // md_entities.ensureUserIsSubSampleManager,
  SubSampleController.updateSubSample
)

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
router.delete(
  '/:subSampleId',
  ensureSubSampleExists,
  // md_entities.ensureUserIsSubSampleManager,
  SubSampleController.deleteSubSample
)

module.exports = router
