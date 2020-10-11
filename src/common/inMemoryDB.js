const Datastore = require('nedb-promises')
const User = require('../resources/users/user.model')
const db = {}
db.users = Datastore.create(/* './db/users.db' */)
db.boards = Datastore.create(/* './db/boards.db' */)
db.tasks = Datastore.create(/* './db/tasks.db' */)
;(async () => {
  await db.users
    .insert([new User(), new User(), new User(), new User()])
    .catch(err => console.log(err))
})()

const getAllUsers = async () => await db.users.find({})

const getUser = async id => await db.users.findOne({ id })

const createUser = async user => {
  const newUser = new User(user)
  await db.users.insert(newUser)
  return newUser
}

const removeUser = async id => {
  const user = await getUser(id)
  await db.users.remove({ id })
  return user
}

const updateUser = async (id, userNew) =>
  await db.users.update({ id }, { $set: userNew }, { returnUpdatedDocs: true })

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser }
