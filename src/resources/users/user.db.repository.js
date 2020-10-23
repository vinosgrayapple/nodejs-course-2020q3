const User = require('./user.model')
const createError = require('http-errors')
const asyncHandler = require('express-async-handler')

const getAll = asyncHandler(async () => {
  const users = await User.find({})
  if (!users || users.length === 0) {
    throw createError.NotFound('Users not found')
  }
  return users
})
// Get User byId
const get = asyncHandler(async id => {
  const user = await User.findById(id)
  if (!user) {
    throw createError.NotFound(`User with id: ${id} not found`)
  }
  return user
})
// Create User
const create = asyncHandler(async user => await User.create(user))
// Remove user
const remove = async id => asyncHandler(await User.findByIdAndRemove(id))
// Update User
const update = async (id, userNew) =>
  asyncHandler(await User.findByIdAndUpdate(id, userNew))

module.exports = { getAll, get, create, update, remove }
