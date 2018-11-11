const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const moment = require('moment-timezone')
const jwt = require('jwt-simple')
const uuidv4 = require('uuid/v4')
const APIError = require('../utils/APIError')
const timestamps = require('mongoose-timestamp')
const mongoosePaginate = require('mongoose-paginate-v2')
const {
  EntityNotFound,
  ParamNotFound,
  Unauthorize,
  Conflict
} = require('../exceptionPool')
const { env, jwtSecret, jwtExpirationInterval } = require('../setup/vars')
const debug = require('debug')('AP:Models:User')

/**
 * User Roles
 */
const roles = ['user', 'admin']

/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128
  },
  name: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true
  },
  services: {
    facebook: String,
    google: String
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  },
  picture: {
    type: String,
    trim: true
  }
})

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next()

    const rounds = env === 'test' ? 1 : 10

    const hash = await bcrypt.hash(this.password, rounds)
    this.password = hash

    return next()
  } catch (error) {
    return next(error)
  }
})

/**
 * Methods
 */
userSchema.method({
  transform() {
    const transformed = {}
    const fields = ['id', 'name', 'email', 'picture', 'role', 'createdAt']

    fields.forEach(field => {
      transformed[field] = this[field]
    })

    return transformed
  },

  token() {
    const playload = {
      exp: moment()
        .add(jwtExpirationInterval, 'minutes')
        .unix(),
      iat: moment().unix(),
      sub: this._id
    }
    return jwt.encode(playload, jwtSecret)
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password)
  }
})

/**
 * Statics
 */
userSchema.statics = {
  roles,

  async list({ query }) {
    debug('list', { query })
    const filter = {}
    if (query.name) filter.name = query.name
    if (query.email) filter.email = query.email
    if (query.role) filter.role = query.role
    const limit = query.limit || 100
    const page = query.page || 1
    const sort = { createdAt: -1 }
    return await this.paginate(filter, { page, limit, sort })
  },

  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const user = await this.findById(id).exec()
      if (user) return user
    }
    throw new EntityNotFound({ entity: 'user', id })
  },

  /**
   * Find user by email and tries to generate a JWT token
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async findAndGenerateToken(options) {
    const { email, password, refreshObject } = options
    if (!email)
      throw new ParamNotFound({
        description: 'An email is required to generate a token'
      })

    const user = await this.findOne({ email }).exec()

    if (password) {
      if (user && (await user.passwordMatches(password))) {
        return { user, accessToken: user.token() }
      }
      throw new Unauthorize({
        description: 'Incorrect email or password'
      })
    } else if (refreshObject && refreshObject.userEmail === email) {
      if (moment(refreshObject.expires).isBefore()) {
        throw new Unauthorize({ description: 'Invalid refresh token.' })
      } else {
        return { user, accessToken: user.token() }
      }
    } else {
      throw new Unauthorize({
        description: 'Incorrect email or refreshToken'
      })
    }
  },

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateEmail(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new Conflict({
        message: 'Validation Error',
        errors: [
          {
            field: 'email',
            location: 'body',
            messages: ['"email" already exists']
          }
        ]
      })
    }
    return error
  },

  async oAuthLogin({ service, id, email, name, picture }) {
    const user = await this.findOne({
      $or: [{ [`services.${service}`]: id }, { email }]
    })
    if (user) {
      user.services[service] = id
      if (!user.name) user.name = name
      if (!user.picture) user.picture = picture
      return user.save()
    }
    const password = uuidv4()
    return this.create({
      services: { [service]: id },
      email,
      password,
      name,
      picture
    })
  }
}

userSchema.plugin(timestamps)
userSchema.plugin(mongoosePaginate)

/**
 * @typedef User
 */
module.exports = mongoose.model('User', userSchema)
