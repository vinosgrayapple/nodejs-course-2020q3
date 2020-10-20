const User = require('./user.model')
const createError = require('http-errors')
const asyncHandler = require('express-async-handler')
const getAll = asyncHandler(async () => {
  const users = await User.find({}).exec()
  if (!users || users.length === 0) {
    throw createError.NotFound('Users not found')
  }
  return users
})
const get = async id => {
  User.findById(id, (err, user) => {
    console.log(err, user)
  })
  // try {
  //   console.log('user.db.repository')
  //   return await User.findById(id).exec()
  // } catch (error) {
  //   console.error(error)
  //   // throw NotFoundError(error.message)
  // }
}
const create = async user => {
  try {
    return await User.create(user).exec()
  } catch (error) {
    console.log(error.message)
    throw Error(error.message)
  }
}
const remove = async id => {
  try {
    return await (await User.remove({ _id: id }).exec()).deletedCount
  } catch (error) {
    throw Error(error.message)
  }
}
const update = async (id, userNew) => {
  try {
    return await User.updateOne({ _id: id }, userNew).exec()
  } catch (error) {
    throw Error(error.message)
  }
}

module.exports = { getAll, get, create, update, remove }
