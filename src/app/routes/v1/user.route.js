const express = require('express')
const validate = require('express-validation')
const expressDeliver = require('express-deliver')
const controller = require('../../controllers/user.controller')
const {
  authorize,
  ADMIN,
  LOGGED_USER
} = require('../../middlewares/auth.middleware')
const {
  listUsers,
  createUser,
  replaceUser,
  updateUser
} = require('../../validations/user.validation')

const router = express.Router()
expressDeliver(router)

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load)

/**
 * @swagger
 *
 * /users:
 *   get:
 *     summary: Get list of user
 *     description: Get list of user
 *     tags: [User]
 *     produces:
 *     - application/json
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return array of user
 *         schema:
 *           $ref: '#/definitions/UsersResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.get('/', authorize(ADMIN), validate(listUsers), controller.list)

/**
 * @swagger
 *
 * /users:
 *   post:
 *     summary: Add new user
 *     description: Add new user
 *     tags: [User]
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/UserData'
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return user created
 *         schema:
 *           $ref: '#/definitions/UserResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.post('/', authorize(ADMIN), validate(createUser), controller.create)

/**
 * @swagger
 *
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Get user profile
 *     tags: [User]
 *     produces:
 *     - application/json
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return user
 *         schema:
 *           $ref: '#/definitions/UserResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.get('/profile', authorize(), controller.loggedIn)

/**
 * @swagger
 *
 * /users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     description: Get user by ID
 *     tags: [User]
 *     produces:
 *     - application/json
 *     parameters:
 *     - $ref: '#/parameters/userId'
 *     security:
 *     - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return user
 *         schema:
 *           $ref: '#/definitions/UserResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.get('/:userId', authorize(LOGGED_USER), controller.get)

/**
 * @swagger
 *
 * /users/{userId}:
 *   put:
 *     summary: Update user
 *     description: Update user
 *     tags: [User]
 *     produces:
 *     - application/json
 *     parameters:
 *     - $ref: '#/parameters/userId'
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/UserData'
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return user updated
 *         schema:
 *           $ref: '#/definitions/UserResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.put(
  '/:userId',
  authorize(LOGGED_USER),
  validate(replaceUser),
  controller.replace
)

/**
 * @swagger
 *
 * /users/{userId}:
 *   patch:
 *     summary: Update user
 *     description: Update user
 *     tags: [User]
 *     produces:
 *     - application/json
 *     parameters:
 *     - $ref: '#/parameters/userId'
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/UserData'
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Return user updated
 *         schema:
 *           $ref: '#/definitions/UserResponse'
 *       403:
 *         $ref: '#/responses/AuthenticationFail'
 *       422:
 *         $ref: '#/responses/ParamMisssing'
 */
router.patch(
  '/:userId',
  authorize(LOGGED_USER),
  validate(updateUser),
  controller.update
)

/**
 * @swagger
 *
 * /users/{userId}:
 *   delete:
 *     summary: Delete user
 *     description: Delete user
 *     tags: [User]
 *     produces:
 *     - application/json
 *     parameters:
 *     - $ref: '#/parameters/userId'
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
router.delete('/:userId', authorize(LOGGED_USER), controller.remove)

module.exports = router
