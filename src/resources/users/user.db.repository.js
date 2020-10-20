const User = require('./user.model')

const getAll = async () => {
  try {
    return await User.find({})
  } catch (error) {
    throw Error(error.message)
  }
}
const get = async id => {
  try {
    return await User.findById({ _id: id })
  } catch (error) {
    throw Error(error.message)
  }
}
const create = async user => {
  try {
    return await User.create(user)
  } catch (error) {
    throw Error(error.message)
  }
}
const remove = async id => {
  try {
    return await (await User.remove({ _id: id })).deletedCount
  } catch (error) {
    throw Error(error.message)
  }
}
const update = async (id, userNew) => {
  try {
    return await User.updateOne({ _id: id }, userNew)
  } catch (error) {
    throw Error(error.message)
  }
}

module.exports = { getAll, get, create, update, remove }
