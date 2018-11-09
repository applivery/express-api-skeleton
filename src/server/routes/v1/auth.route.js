const express = require('express')
const validate = require('express-validation')
const expressDeliver = require('express-deliver')
const controller = require('../../controllers/auth.controller')
const oAuthLogin = require('../../middlewares/auth.middleware').oAuth
const {
  login,
  register,
  oAuth,
  refresh
} = require('../../validations/auth.validation')

const router = express.Router()
expressDeliver(router)

/**
 * @swagger
 *
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     description: Register new user
 *     tags: [Auth]
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/AuthData'
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return token and user
 *         schema:
 *           $ref: '#/definitions/AuthResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.post('/register', validate(register), controller.register)

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Login user
 *     tags: [Auth]
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/AuthData'
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return token and user
 *         schema:
 *           $ref: '#/definitions/AuthResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.post('/login', validate(login), controller.login)

/**
 * @swagger
 *
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh Token
 *     description: Refresh Token
 *     tags: [Auth]
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/RefreshData'
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return token
 *         schema:
 *           $ref: '#/definitions/RefreshResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.post('/refresh-token', validate(refresh), controller.refresh)
/**
 * TODO: POST /v1/auth/reset-password
 */
router.post(
  '/facebook',
  validate(oAuth),
  oAuthLogin('facebook'),
  controller.oAuth
)
router.post('/google', validate(oAuth), oAuthLogin('google'), controller.oAuth)

module.exports = router
