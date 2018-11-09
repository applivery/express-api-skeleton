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
EntitySchema.plugin(timestamps)
EntitySchema.plugin(mongoosePaginate)
EntitySchema.pre('remove', async function() {
  debug('SubSample Pre Remove')
  const SampleModel = require('./sample')
  await SampleModel.updateOne(
    { _id: this.sample },
    { $pull: { subSamples: this._id } }
  )
})
module.exports = mongoose.model('SubSample', EntitySchema)
