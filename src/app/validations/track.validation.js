const Joi = require('joi')
const Track = require('../models/track.model')

module.exports = {
  // GET /v1/tracks
  listTracks: {
    query: {
      page: Joi.number().min(1),
      limit: Joi.number()
        .min(1)
        .max(100)
    }
  }
}
