'use strict'
const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const mongoosePaginate = require('mongoose-paginate-v2')
const { EntityNotFound } = require('../exceptionPool')
const debug = require('debug')('AP:Models:Sample')

const Schema = mongoose.Schema
const EntitySchema = Schema({
  name: {
    type: String,
    required: true
  }
})
EntitySchema.pre('remove', async function() {
  debug('Sample Pre Remove')
  const SubSampleModel = require('./subSample.model')
  const subSamples = await SubSampleModel.find({ sample: this._id })
  await Promise.all(
    subSamples.map(async item => {
      debug('Remove subSamples', { item })
      await item.remove()
    })
  )
})

EntitySchema.method({
  transform() {
    const transformed = {}
    const fields = ['id', 'name', 'createdAt']

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
    return await this.paginate(filter, { page, limit, sort })
  },
  async get(id) {
    try {
      let sample

      if (mongoose.Types.ObjectId.isValid(id)) {
        sample = await this.findById(id).exec()
      }
      if (sample) {
        return sample
      }
      throw new EntityNotFound({ entity: 'sample', id })
    } catch (error) {
      throw error
    }
  }
}

EntitySchema.plugin(timestamps)
EntitySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Sample', EntitySchema)
