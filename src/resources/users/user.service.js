const usersRepo = require('./user.memory.repository')

const getAll = () => usersRepo.getAll()
const get = id => usersRepo.get(id)
const create = user => usersRepo.create(user)
module.exports = { getAll, get, create }
