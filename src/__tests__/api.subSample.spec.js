const EntityTool = require('../__tests_tools__/_EntityTool')
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

  describe('SubSample', () => {
    describe('List SubSamples', () => {
      it('List: Array Empty', async () => {
        const sample = await EntityTool.createSample()
        const response = await request(app).get(getUrl({ sample }))
        expect(response.body.data.docs).toEqual([])
        expect(response.body.status).toEqual(true)
        expect(response.status).toEqual(200)
      })
      it('List: 1 content', async () => {
        const sample = await EntityTool.createSample()
        await EntityTool.createSubSample({ sample })
        const response = await request(app).get(getUrl({ sample }))
        expect(response.body.data.docs.length).toEqual(1)
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
    describe('Get', () => {
      it('Get SubSample', async () => {
        const sample = await EntityTool.createSample()
        const subSample = await EntityTool.createSubSample({ sample })
        const response = await request(app).get(
          getItemUrl({ sample, subSample })
        )
        var error = await EntityTool.validateSubSample(response.body.data)
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
        const sample = await EntityTool.createSample()
        const data = EntityTool.fakeSubSample()
        const response = await request(app)
          .post(getUrl({ sample }))
          .send(data)
        var error = await EntityTool.validateSubSample(response.body.data)
        expect(error).toBeUndefined()
        expect(response.body.data.name).toBe(data.name)
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
    describe('Update', () => {
      it('Update SubSample', async () => {
        const sample = await EntityTool.createSample()
        const subSample = await EntityTool.createSubSample({ sample })
        const data = EntityTool.fakeSubSample()
        data.name = 'New SubSample Name'
        const response = await request(app)
          .put(getItemUrl({ sample, subSample }))
          .send(data)
        var error = await EntityTool.validateSubSample(response.body.data)
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
        const sample = await EntityTool.createSample()
        const subSample = await EntityTool.createSubSample({ sample })
        const response = await request(app).delete(
          getItemUrl({ sample, subSample })
        )
        expect(response.body.data).toEqual({})
        expect(response.body.status).toEqual(true)
        expect(response.statusCode).toBe(200)
      })
    })
  })
})
