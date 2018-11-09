const SampleService = require('../server/services/sample.service')
const SampleModel = require('../server/models/sample.model')
const SubSampleService = require('../server/services/subSample.service')
const SubSampleModel = require('../server/models/subSample.model')
const TrackModel = require('../server/models/track.model')

module.exports = {
  async dropDatabase() {
    // await mongoose.connection.db.dropDatabase()
  },
  async cleanDatabaseBetweenTests() {
    await SubSampleModel.remove({})
    await SampleModel.remove({})
    await TrackModel.remove({})
    return null
  },
  async cleanDatabase() {
    await this.cleanDatabaseBetweenTests()
    await this.dropDatabase()
    return null
  },
  fakeSample() {
    return { name: 'Sample for test' }
  },
  async createSample() {
    const data = this.fakeSample()
    return await SampleService.addSample({ data })
  },
  async validateSample(data) {
    const item = new SampleModel(data)
    var error = item.validateSync()
    return error
  },
  fakeSubSample() {
    return { name: 'SubSample for test' }
  },
  async createSubSample({ sample }) {
    const data = this.fakeSubSample()
    return await SubSampleService.addSubSample({ sample, data })
  },
  async validateSubSample(data) {
    const item = new SubSampleModel(data)
    var error = item.validateSync()
    return error
  }
}
