'use strict'
const express = require('express')
const expressDeliver = require('express-deliver')
const swaggerUi = require('swagger-ui-express')
const path = require('path')
const SwaggerController = require('../../controllers/swagger.controller')
const debug = require('debug')('AP:Routes:Swagger')

const router = express.Router()
expressDeliver(router)

var uiOptions = {
  customCss:
    '.swagger-ui .topbar { display: none }  .wrapper { word-break: break-all }'
}

const swaggerSpecs = SwaggerController.getDefinition()

router.get('/api.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpecs)
})
router.use('/api-ui', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, uiOptions))
router.get('/api-ui2', (req, res) => {
  const devMode = process.env.NODE_ENV === 'development'
  let file = 'swagger-ui.html'
  if (devMode) file = 'swagger-ui-dev.html'
  res.sendFile(path.join(__dirname + `/../../html/${file}`))
})

module.exports = router
