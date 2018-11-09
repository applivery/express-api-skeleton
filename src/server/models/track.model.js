'use strict'
const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const mongoosePaginate = require('mongoose-paginate-v2')
const debug = require('debug')('AP:Models:Track')

const Schema = mongoose.Schema

const RequestSchema = Schema(
  {
    method: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    headers: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  { _id: false }
)
const ResponseSchema = Schema(
  {
    status: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  { _id: false }
)
const EntitySchema = Schema({
  request: RequestSchema,
  response: ResponseSchema
})
EntitySchema.plugin(timestamps)
EntitySchema.plugin(mongoosePaginate)
EntitySchema.pre('remove', async function() {
  debug('Track Pre Remove')
})
module.exports = mongoose.model('Track', EntitySchema)
