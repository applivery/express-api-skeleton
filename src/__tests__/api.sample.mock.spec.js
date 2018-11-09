const mockingoose = require('mockingoose').default
const MockTool = require('../__tests_tools__/MockTool')
const request = require('supertest')
const app = require('../app/app')

function getUrl() {
  return `/v1/sample`
}

function getItemUrl({ sample }) {
  return getUrl() + '/' + sample._id
}

describe('Sample Test', () => {
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

  describe('Sample', () => {
    describe('List Samples', () => {
      it('List: Array Empty', async () => {
        const samples = []
        mockingoose.Sample.toReturn(samples, 'find')
        const response = await request(app).get(getUrl())
        expect(response.body.data.docs).toEqual(samples)
        expect(response.body.status).toEqual(true)
        expect(response.status).toEqual(200)
      })
      it('List: contents', async () => {
        const samples = MockTool.mockSamples()
        mockingoose.Sample.toReturn(samples, 'find')
        const response = await request(app).get(getUrl())
        expect(response.body.data.docs.length).toEqual(samples.length)
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
    describe('Get', () => {
      it('Get Sample', async () => {
        const sample = MockTool.mockSample()
        mockingoose.Sample.toReturn(sample, 'findOne')
        const response = await request(app).get(getItemUrl({ sample }))
        var error = await MockTool.validateSample(response.body.data)
        expect(error).toBeUndefined()
        expect(response.body.data._id.toString()).toEqual(sample._id.toString())
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
    describe('Add', () => {
      it('Add Sample', async () => {
        const data = MockTool.mockSampleData()
        const sample = MockTool.mockSample()
        mockingoose.Sample.toReturn(sample, 'save')
        const response = await request(app)
          .post(getUrl())
          .send(data)
        var error = await MockTool.validateSample(response.body.data)
        expect(error).toBeUndefined()
        expect(response.body.data.name).toBe(data.name)
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
    describe('Update', () => {
      it('Update Sample', async () => {
        const data = MockTool.mockSampleData()
        let sample = MockTool.mockSample()
        sample = Object.assign(sample, data)
        mockingoose.Sample.toReturn(sample, 'findOne')
        mockingoose.Sample.toReturn(sample, 'findOneAndUpdate')
        const response = await request(app)
          .put(getItemUrl({ sample }))
          .send(data)
        var error = await MockTool.validateSample(response.body.data)
        expect(error).toBeUndefined()
        expect(response.body.data._id.toString()).toEqual(sample._id.toString())
        expect(response.body.data.name).toEqual(data.name)
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
    describe('Remove', () => {
      it('Remove Sample', async () => {
        const sampleRemove = {}
        const sample = MockTool.mockSample()
        mockingoose.Sample.toReturn(sample, 'findOne')
        mockingoose.Sample.toReturn(sampleRemove, 'remove')
        const response = await request(app).delete(getItemUrl({ sample }))
        expect(response.body.data).toEqual(sampleRemove)
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
  })
})
