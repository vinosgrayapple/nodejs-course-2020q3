const createError = require('http-errors')
const { UNAUTHORIZED } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const authVerify = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) {
    throw createError(UNAUTHORIZED, 'No token!')
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      throw createError(UNAUTHORIZED, 'Token invalid!')
    }
    req.user = user
    next()
  })
}

module.exports = { authVerify }
