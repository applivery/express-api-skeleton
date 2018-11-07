'use strict'
const express = require('express')
const expressDeliver = require('express-deliver')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const debug = require('debug')('AP:Routes:Swagger')

const router = express.Router()
expressDeliver(router)

const swaggerDefinition = {
  info: {
    title: 'Applivery - API Documentation',
    version: '1.0.0' // Version (required)
  },
  basePath: '/v1',
  securityDefinitions: {
    ApiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'authorization',
      description: 'API JWT Token'
    }
  }
}
const docOptions = {
  swaggerDefinition,
  apis: ['./server/routes/v1/definitions/*.yml', './server/routes/v1/*.js']
}

var uiOptions = {
  customCss:
    '.swagger-ui .topbar { display: none }  .wrapper { word-break: break-all }'
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(docOptions)

router.get('/api.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})
router.use('/api-ui', swaggerUi.serve, swaggerUi.setup(swaggerSpec, uiOptions))

module.exports = router
