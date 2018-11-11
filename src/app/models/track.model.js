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
  response: ResponseSchema,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})
EntitySchema.pre('remove', async function() {
  debug('Track Pre Remove')
})

EntitySchema.method({
  transform() {
    const transformed = {}
    const fields = ['id', 'user', 'request', 'response', 'createdAt']

    fields.forEach(field => {
      transformed[field] = this[field]
    })

    return transformed
  }
})

EntitySchema.statics = {
  async list({ query }) {
    debug('list', { query })
    const filter = {}
    if (query.name) filter.name = query.name
    const limit = query.limit || 100
    const page = query.page || 1
    const sort = { createdAt: -1 }
    const populate = [{ path: 'user', select: ['email'] }]
    return await this.paginate(filter, { page, limit, sort, populate })
  },
  async get(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const track = await this.findById(id).exec()
      if (track) return track
    }
    throw new EntityNotFound({ entity: 'track', id })
  }
}
EntitySchema.plugin(timestamps)
EntitySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Track', EntitySchema)
