const SampleService = require('../server/services/sample')
const SampleModel = require('../server/models/sample')
const SubSampleService = require('../server/services/subSample')
const SubSampleModel = require('../server/models/subSample')
const TrackModel = require('../server/models/track')

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
