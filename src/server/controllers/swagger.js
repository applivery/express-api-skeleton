'use strict'
const swaggerJSDoc = require('swagger-jsdoc')
const m2s = require('mongoose-to-swagger')
const SampleModel = require('../models/sample')
const SubSampleModel = require('../models/subSample')
const TrackModel = require('../models/track')
const packageJson = require('../../package.json')
const debug = require('debug')('AP:Controller:Track')

async function getDefinition(req, res) {
  debug('getDefinition')

  const swaggerDefinition = {
    info: {
      title: 'Applivery - API Documentation',
      version: packageJson.version
    },
    basePath: '/v1',
    securityDefinitions: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'authorization',
        description: 'API JWT Token'
      }
    },
    definitions: {
      SampleModel: m2s(SampleModel),
      SubSampleModel: m2s(SubSampleModel),
      TrackModel: m2s(TrackModel)
    }
  } // Version (required)

  const docOptions = {
    swaggerDefinition,
    apis: ['./server/routes/v1/definitions/*.yml', './server/routes/v1/*.js']
  }

  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  const swaggerSpec = swaggerJSDoc(docOptions)
  return swaggerSpec
}

module.exports = {
  getDefinition
}
