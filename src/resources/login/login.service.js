const usersRepo = require('./login.db.repository')
// const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const getToken = async user => {
  const data = await usersRepo.validate(user)
  const expiration = '1h'
  const signature = process.env.JWT_SECRET_KEY
  const token = await jwt.sign(data, signature, {
    expiresIn: expiration
  })
  return token
}
module.exports = { getToken }
