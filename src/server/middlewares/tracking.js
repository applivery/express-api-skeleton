'user strict'
const mung = require('express-mung')
const TrackService = require('../services/track')
const debug = require('debug')('AP:Middleware:tracking')

/* Remove any classified information from the response. */
async function track(body, req, res) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  const data = {
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
  const trackMethodArray = ['post', 'put', 'delete']
  if (trackMethodArray.includes(data.request.method.toLowerCase())) {
    debug('Request Tracked')
    await TrackService.addTrack({ data })
  }

  return body
}

module.exports = mung.jsonAsync(track)
