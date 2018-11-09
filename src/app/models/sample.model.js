'use strict'
const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const mongoosePaginate = require('mongoose-paginate-v2')
const debug = require('debug')('AP:Models:Sample')

const Schema = mongoose.Schema
const EntitySchema = Schema({
  name: {
    type: String,
    required: true
  },
  subSamples: [{ type: Schema.Types.ObjectId, ref: 'SubSample' }]
})
EntitySchema.plugin(timestamps)
EntitySchema.plugin(mongoosePaginate)
EntitySchema.pre('remove', async function() {
  debug('Sample Pre Remove')
  if (this.subSamples) {
    await Promise.all(
      this.subSamples.map(async itemId => {
        debug('Pre Remove subSamples', itemId)
        const item = await SubSampleModel.findOne({ _id: itemId })
        debug('Pre Remove subSamples', { item })
        if (item) await item.remove()
      })
    )
  }
})
module.exports = mongoose.model('Sample', EntitySchema)
