jest.mock('../../secrets', () => {
  const parameters = require('../../__mocks__/secrets')
  const testFile = require('path')
    .basename(global.jasmine.testPath)
    .replace('.spec.js', '')

  parameters.mongo.database = 'applivery-test-' + testFile.replace('.', '-')
  return parameters
})

const EntityTool = require('../__tests_tools__/_EntityTool')
const request = require('supertest')
const app = require('../app')

function getUrl() {
  return `/v1/sample`
}

function getItemUrl({ sample }) {
  return getUrl() + '/' + sample._id
}

describe('Sample Test', () => {
  beforeAll(async done => {
    await EntityTool.cleanDatabase()
    done()
  })
  beforeEach(async done => {
    await EntityTool.cleanDatabaseBetweenTests()
    done()
  })
  afterEach(async done => {
    done()
  })
  afterAll(async done => {
    done()
  })

  describe.skip('Sample', () => {
    describe('List Samples', () => {
      it('List: Array Empty', async () => {
        const response = await request(app).get(getUrl())
        expect(response.body.data.docs).toEqual([])
        expect(response.body.status).toEqual(true)
        expect(response.status).toEqual(200)
      })
      it('List: 1 content', async () => {
        await EntityTool.createSample()
        const response = await request(app).get(getUrl())
        expect(response.body.data.docs.length).toEqual(1)
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
    describe('Get', () => {
      it('Get Sample', async () => {
        const sample = await EntityTool.createSample()
        const response = await request(app).get(getItemUrl({ sample }))
        var error = await EntityTool.validateSample(response.body.data)
        expect(error).toBeUndefined()
        expect(response.body.data._id.toString()).toEqual(sample._id.toString())
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
    describe('Add', () => {
      it('Add Sample', async () => {
        const data = EntityTool.fakeSample()
        const response = await request(app)
          .post(getUrl())
          .send(data)
        var error = await EntityTool.validateSample(response.body.data)
        expect(error).toBeUndefined()
        expect(response.body.data.name).toBe(data.name)
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
    describe('Update', () => {
      it('Update Sample', async () => {
        const sample = await EntityTool.createSample()
        const data = EntityTool.fakeSample()
        data.name = 'New Sample Name'
        const response = await request(app)
          .put(getItemUrl({ sample }))
          .send(data)
        var error = await EntityTool.validateSample(response.body.data)
        expect(error).toBeUndefined()
        expect(response.body.data._id.toString()).toEqual(sample._id.toString())
        expect(response.body.data.name).toEqual(data.name)
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
    describe('Remove', () => {
      it('Remove Sample', async () => {
        const sample = await EntityTool.createSample()
        const response = await request(app).delete(getItemUrl({ sample }))
        expect(response.body.data).toEqual({})
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
  })
})
