const DB = require('../../common/inMemoryDB')
const { NotFoundError } = require('../../lib/errors')

const getAll = async () => DB.getAllUsers()

const get = async id => {
  const user = await DB.getUser(id)
  if (!user) {
    throw new NotFoundError(`User with id: "${id}"  Not Found`)
  }
  return user
}

const create = async user => await DB.createUser(user)
const remove = async id => await DB.removeUser(id)
const update = async (id, userNew) => {
  await DB.updateUser(id, userNew)
  return await get(id)
}

module.exports = { getAll, get, create, update, remove }
