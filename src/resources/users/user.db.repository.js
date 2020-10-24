const User = require('./user.model')
const createError = require('http-errors')
const asyncHandler = require('express-async-handler')

const getAll = async () => User.find({})

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
const remove = asyncHandler(async id => await User.findByIdAndRemove(id))
// Update User
const update = asyncHandler(async (id, userNew) => {
  await User.findByIdAndUpdate(id, userNew)
  return get(id)
})

module.exports = { getAll, get, create, update, remove }
