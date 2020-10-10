const DB = require('../../common/inMemoryDB')

const getAll = async () => DB.getAllUsers()
const get = async id => {
  console.log('id :>> ', id)
  const user = await DB.getUser(id)
  console.log('user :>> ', user)
  if (!user) {
    console.log('error :>> ', 'Iam error')
    throw new Error(`Ой-ой! The user with id: ${id} was not found`)
  }
  return user
}
const create = async user => DB.createUser(user)
module.exports = { getAll, get, create }
