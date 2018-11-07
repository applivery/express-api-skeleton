jest.mock('../../secrets', () => {
  const parameters = require('../../__mocks__/secrets')
  const testFile = require('path')
    .basename(global.jasmine.testPath)
    .replace('.spec.js', '')

  parameters.mongo.database = 'applivery-test-' + testFile.replace('.', '-')
  return parameters
})

const request = require('supertest')
const app = require('../app')

function getUrl() {
  return `/v1/status`
}

describe('Status Test', () => {
  beforeAll(async done => {
    done()
  })
  beforeEach(async done => {
    done()
  })
  afterEach(async done => {
    done()
  })
  afterAll(async done => {
    done()
  })

  describe('Status', () => {
    describe('Get', () => {
      it('Get Status', async () => {
        const response = await request(app).get(getUrl())
        expect(response.status).toEqual(200)
        expect(response.body.status).toEqual(true)
        expect(typeof response.body.data.name).toBe('string')
        expect(typeof response.body.data.version).toBe('string')
        expect(typeof response.body.data.ip).toBe('string')
      })
    })
  })
})
