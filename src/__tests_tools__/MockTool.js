const SampleModel = require('../server/models/sample.model')
const SubSampleModel = require('../server/models/subSample.model')

module.exports = {
  // Sample
  mockSample() {
    return { _id: '507f191e810c19729de860ea', name: 'name' }
  },
  mockSamples() {
    return [
      { _id: '507f191e810c19729de860ea', name: 'name1' },
      { _id: '507f191e810c19729de86009', name: 'name2' }
    ]
  },
  mockSampleData() {
    return { name: 'Sample for test' }
  },
  async validateSample(data) {
    const item = new SampleModel(data)
    var error = item.validateSync()
    return error
  },
  // SubSample
  mockSubSample() {
    return { _id: '507f191e810c19729de86012', name: 'name' }
  },
  mockSubSamples() {
    return [
      { _id: '507f191e810c19729de86012', name: 'name1' },
      { _id: '507f191e810c19729de86019', name: 'name2' }
    ]
  },
  mockSubSampleData() {
    return { name: 'SubSample for test' }
  },
  async validateSubSample(data) {
    const item = new SubSampleModel(data)
    var error = item.validateSync()
    return error
  }
}
