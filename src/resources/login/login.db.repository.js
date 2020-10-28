const User = require('../users/user.model')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const { FORBIDDEN } = require('http-status-codes')
const validate = async ({ login, password }) => {
  const user = await User.findOne({ login })
  try {
    const isValid = await bcrypt.compare(password, user.password)
    if (isValid) {
      return { login, _id: user._id }
    }
    throw createError(FORBIDDEN, 'Forbidden, invalid login or password')
  } catch (err) {
    throw createError(FORBIDDEN, 'Forbidden, invalid login or password')
  }
}

module.exports = { validate }
