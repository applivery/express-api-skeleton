'use strict'
const axios = require('axios')
const debug = require('debug')('AP:Lib:ConnectionLib')

module.exports = {
  async send({ url, method, body, headers }) {
    debug('send', { url, method, body, headers })
    debug('headers', JSON.stringify(headers))
    const axiosConfig = { method, url }
    if (headers) axiosConfig.headers = headers
    if (body) axiosConfig.data = body

    try {
      debug('axios prerequest', { axiosConfig })
      const response = await axios(axiosConfig)
      if (response) {
        debug('axios response status', response.status)
        debug('axios response data', response.data)
        return response.data
      } else {
        debug('axios error', 'No response')
        return { error: 'No response' }
      }
    } catch (error) {
      if (error.response) {
        debug('axios error', 'status', error.response.status)
        debug('axios error', 'data', error.response.data)
        throw error.response.data
      } else {
        debug('axios error', 'No response')
        const response = { message: 'No response' }
        throw response
      }
    }
  }
}
