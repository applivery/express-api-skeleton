const Joi = require('joi')
const SubSample = require('../models/subSample.model')

module.exports = {
  // GET
  listSubSamples: {
    query: {
      page: Joi.number().min(1),
      limit: Joi.number()
        .min(1)
        .max(100),
      name: Joi.string()
    }
  },

  // POST
  createSubSample: {
    body: {
      name: Joi.string()
        .max(128)
        .required()
    }
  },

  // PUT
  replaceSubSample: {
    body: {
      name: Joi.string().max(128)
    },
    params: {
      subSampleId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // PATCH
  updateSubSample: {
    body: {
      name: Joi.string().max(128)
    },
    params: {
      subSampleId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // DELETE
  deleteSubSample: {
    params: {
      subSampleId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
}
