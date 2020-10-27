const usersRepo = require('./user.db.repository')
const taskRepo = require('../tasks/task.db.repository')
const getAll = () => usersRepo.getAll()
const get = id => usersRepo.get(id)
const create = user => usersRepo.create(user)
const remove = async id => {
  const isRemoved = await usersRepo.remove(id)

  if (isRemoved) {
    return await taskRepo.clearUserIdAfterDelUser(id)
  }
}
const update = (id, updateForUser) => usersRepo.update(id, updateForUser)
module.exports = { getAll, get, create, update, remove }
