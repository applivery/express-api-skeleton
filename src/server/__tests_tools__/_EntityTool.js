const SampleService = require('../services/sample')
const SampleModel = require('../models/sample')
const SubSampleService = require('../services/subSample')
const SubSampleModel = require('../models/subSample')

module.exports = {
  async dropDatabase() {
    // await mongoose.connection.db.dropDatabase()
  },
  async cleanDatabaseBetweenTests() {
    await SampleModel.remove({})
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
