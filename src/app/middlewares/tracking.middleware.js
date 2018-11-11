'user strict'
const mung = require('express-mung')
const TrackService = require('../services/track.service')
const debug = require('debug')('AP:Middleware:tracking')

/* Remove any classified information from the response. */
async function track(body, req, res) {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  const user = req.user
  debug('USER', user)
  const data = {
    user,
    request: {
      method: String(req.method),
      url: String(fullUrl),
      headers: JSON.stringify(req.headers),
      body: JSON.stringify(req.body)
    },
    response: {
      status: String(res.statusCode),
      body: JSON.stringify(body)
    }
  }
  const trackMethodArray = ['get', 'post', 'put', 'patch', 'delete']
  const excludePath = ['/v1/track', '/v1/doc/']
  debug('method', data.request.method.toLowerCase())
  if (trackMethodArray.includes(data.request.method.toLowerCase())) {
    const exclude = excludePath.filter(path => {
      return data.request.url.includes(path)
    })
    if (exclude.length === 0) {
      await TrackService.create({ data })
    }
  }

  return body
}

module.exports = mung.jsonAsync(track)
