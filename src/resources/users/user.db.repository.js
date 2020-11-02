const User = require('./user.model')
const createError = require('http-errors')

const getAll = async () => User.find({})

const get = async _id => User.findById(_id)

const create = async user => User.create(user)

const remove = async id => User.findByIdAndRemove(id)

const update = async (_id, userNew) => {
  try {
    await User.findByIdAndUpdate(_id, userNew)
    return get(_id)
  } catch (err) {
    throw createError(404, `User with id: ${_id}!! NOT FOUND`)
  }
}
module.exports = { getAll, get, create, update, remove }
