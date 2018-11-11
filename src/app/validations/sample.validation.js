const Joi = require('joi')
const Sample = require('../models/sample.model')

module.exports = {
  // GET /v1/samples
  listSamples: {
    query: {
      page: Joi.number().min(1),
      limit: Joi.number()
        .min(1)
        .max(100),
      name: Joi.string()
    }
  },

  // POST /v1/samples
  createSample: {
    body: {
      name: Joi.string()
        .max(128)
        .required()
    }
  },

  // PUT /v1/samples/:sampleId
  replaceSample: {
    body: {
      name: Joi.string().max(128)
    },
    params: {
      sampleId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // PATCH /v1/samples/:sampleId
  updateSample: {
    body: {
      name: Joi.string().max(128)
    },
    params: {
      sampleId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // DELETE
  deleteSample: {
    params: {
      sampleId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
}
