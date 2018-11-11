'use strict'
const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const mongoosePaginate = require('mongoose-paginate-v2')
const debug = require('debug')('AP:Models:SubSample')

const Schema = mongoose.Schema
const EntitySchema = Schema({
  name: {
    type: String,
    required: true
  },
  sample: { type: Schema.Types.ObjectId, ref: 'Sample' }
})
EntitySchema.pre('remove', async function() {
  debug('SubSample Pre Remove')
})

EntitySchema.method({
  transform() {
    const transformed = {}
    const fields = ['id', 'name', 'createdAt', 'sample']

    fields.forEach(field => {
      transformed[field] = this[field]
    })

    return transformed
  }
})

EntitySchema.statics = {
  async list({ sample, query }) {
    debug('list', { query })
    const filter = { sample }
    if (query.name) filter.name = query.name
    const limit = query.limit || 100
    const page = query.page || 1
    const sort = { createdAt: -1 }
    return await this.paginate(filter, { page, limit, sort })
  },
  async get(id) {
    try {
      let subSample

      if (mongoose.Types.ObjectId.isValid(id)) {
        subSample = await this.findById(id).exec()
      }
      if (subSample) {
        return subSample
      }
      throw new EntityNotFound({ entity: 'subSample', id })
    } catch (error) {
      throw error
    }
  }
}

EntitySchema.plugin(timestamps)
EntitySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('SubSample', EntitySchema)
