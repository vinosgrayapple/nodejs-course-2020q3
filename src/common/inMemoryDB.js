const User = require('../resources/users/user.model')
const DB = []
DB.push(new User(), new User())

const getAllUsers = async () => [...DB]
const getUser = async id => DB.find(user => user.id === id)
const createUser = async user => {
  DB.push(user)
  return user
}
module.exports = { getAllUsers, getUser, createUser }
