/* eslint-disable camelcase */
const axios = require('axios')
const User = require('../models/user.model')
const RefreshToken = require('../models/refreshToken.model')
const moment = require('moment-timezone')
const { jwtExpirationInterval } = require('../setup/vars')

function generateTokenResponse(user, accessToken) {
  const tokenType = 'Bearer'
  const refreshToken = RefreshToken.generate(user).token
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes')
  return {
    tokenType,
    accessToken,
    refreshToken,
    expiresIn
  }
}

exports.facebook = async access_token => {
  const fields = 'id, name, email, picture'
  const url = 'https://graph.facebook.com/me'
  const params = { access_token, fields }
  const response = await axios.get(url, { params })
  const { id, name, email, picture } = response.data
  return {
    service: 'facebook',
    picture: picture.data.url,
    id,
    name,
    email
  }
}

exports.google = async access_token => {
  const url = 'https://www.googleapis.com/oauth2/v3/userinfo'
  const params = { access_token }
  const response = await axios.get(url, { params })
  const { sub, name, email, picture } = response.data
  return {
    service: 'google',
    picture,
    id: sub,
    name,
    email
  }
}

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async ({ data }) => {
  try {
    const user = await new User(data).save()
    const userTransformed = user.transform()
    const token = generateTokenResponse(user, user.token())
    return { token, user: userTransformed }
  } catch (err) {
    throw User.checkDuplicateEmail(err)
  }
}

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async ({ data }) => {
  try {
    const { user, accessToken } = await User.findAndGenerateToken(data)
    const token = generateTokenResponse(user, accessToken)
    const userTransformed = user.transform()
    return { token, user: userTransformed }
  } catch (error) {
    throw error
  }
}

/**
 * login with an existing user or creates a new one if valid accessToken token
 * Returns jwt token
 * @public
 */
exports.oAuth = async ({ user }) => {
  try {
    const accessToken = user.token()
    const token = generateTokenResponse(user, accessToken)
    const userTransformed = user.transform()
    return { token, user: userTransformed }
  } catch (error) {
    throw error
  }
}

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async ({ data }) => {
  try {
    const { email, refreshToken } = data
    const refreshObject = await RefreshToken.findOneAndRemove({
      userEmail: email,
      token: refreshToken
    })
    const { user, accessToken } = await User.findAndGenerateToken({
      email,
      refreshObject
    })
    const response = generateTokenResponse(user, accessToken)
    return response
  } catch (error) {
    throw error
  }
}
