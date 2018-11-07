const mockingoose = require('mockingoose').default
const MockTool = require('../__tests_tools__/MockTool')
const request = require('supertest')
const app = require('../server/app')

function getUrl({ sample }) {
  return `/v1/sample/${sample._id}/subSample`
}

function getItemUrl({ sample, subSample }) {
  return getUrl({ sample }) + '/' + subSample._id
}

describe('SubSample Test', () => {
  beforeAll(async done => {
    done()
  })
  beforeEach(async done => {
    mockingoose.resetAll()
    done()
  })
  afterEach(async done => {
    done()
  })
  afterAll(async done => {
    done()
  })

  describe('SubSample', () => {
    describe('List SubSamples', () => {
      it('List: Array Empty', async () => {
        const sample = MockTool.mockSample()
        mockingoose.Sample.toReturn(sample, 'findOne')
        const subSamples = []
        mockingoose.SubSample.toReturn(subSamples, 'find')
        const response = await request(app).get(getUrl({ sample }))
        expect(response.body.data.docs).toEqual(subSamples)
        expect(response.body.status).toEqual(true)
        expect(response.status).toEqual(200)
      })
      it('List: contents', async () => {
        const sample = MockTool.mockSample()
        mockingoose.Sample.toReturn(sample, 'findOne')
        const subSamples = MockTool.mockSubSamples()
        mockingoose.SubSample.toReturn(subSamples, 'find')
        const response = await request(app).get(getUrl({ sample }))
        expect(response.body.data.docs.length).toEqual(subSamples.length)
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
    describe('Get', () => {
      it('Get SubSample', async () => {
        const sample = MockTool.mockSample()
        mockingoose.Sample.toReturn(sample, 'findOne')
        const subSample = MockTool.mockSubSample()
        mockingoose.SubSample.toReturn(subSample, 'findOne')
        const response = await request(app).get(
          getItemUrl({ sample, subSample })
        )
        var error = await MockTool.validateSubSample(response.body.data)
        expect(error).toBeUndefined()
        expect(response.body.data._id.toString()).toEqual(
          subSample._id.toString()
        )
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
    describe('Add', () => {
      it('Add SubSample', async () => {
        const sample = MockTool.mockSample()
        mockingoose.Sample.toReturn(sample, 'findOne')
        const data = MockTool.mockSubSampleData()
        const subSample = MockTool.mockSubSample()
        mockingoose.SubSample.toReturn(subSample, 'save')
        const response = await request(app)
          .post(getUrl({ sample }))
          .send(data)
        var error = await MockTool.validateSubSample(response.body.data)
        expect(error).toBeUndefined()
        expect(response.body.data.name).toBe(data.name)
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
    describe('Update', () => {
      it('Update SubSample', async () => {
        const sample = MockTool.mockSample()
        mockingoose.Sample.toReturn(sample, 'findOne')
        const data = MockTool.mockSubSampleData()
        let subSample = MockTool.mockSubSample()
        subSample = Object.assign(subSample, data)
        mockingoose.SubSample.toReturn(subSample, 'findOne')
        mockingoose.SubSample.toReturn(subSample, 'findOneAndUpdate')
        const response = await request(app)
          .put(getItemUrl({ sample, subSample }))
          .send(data)
        var error = await MockTool.validateSubSample(response.body.data)
        expect(error).toBeUndefined()
        expect(response.body.data._id.toString()).toEqual(
          subSample._id.toString()
        )
        expect(response.body.data.name).toEqual(data.name)
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
    describe('Remove', () => {
      it('Remove SubSample', async () => {
        const sample = MockTool.mockSample()
        mockingoose.Sample.toReturn(sample, 'findOne')
        const subSampleRemove = {}
        const subSample = MockTool.mockSubSample()
        mockingoose.SubSample.toReturn(subSample, 'findOne')
        mockingoose.SubSample.toReturn(subSampleRemove, 'remove')
        const response = await request(app).delete(
          getItemUrl({ sample, subSample })
        )
        expect(response.body.data).toEqual(subSampleRemove)
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
  })
})
