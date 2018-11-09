'use strict'
const swaggerJSDoc = require('swagger-jsdoc')
const m2s = require('mongoose-to-swagger')
const SampleModel = require('../models/sample.model')
const SubSampleModel = require('../models/subSample.model')
const TrackModel = require('../models/track.model')
const UserModel = require('../models/user.model')
const RefreshTokenModel = require('../models/refreshToken.model')
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
      TrackModel: m2s(TrackModel),
      UserModel: m2s(UserModel),
      AuthModel: m2s(RefreshTokenModel)
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
