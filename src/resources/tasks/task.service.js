const tasksRepo = require('./task.memory.repository')

const getAll = boardId => tasksRepo.getAll(boardId)
const get = id => tasksRepo.get(id)
const create = (boardId, task) => tasksRepo.create(boardId, task)
const remove = (boardId, id) => tasksRepo.remove(boardId, id)
const update = (id, updateForTask) => tasksRepo.update(id, updateForTask)
module.exports = { getAll, get, create, update, remove }
