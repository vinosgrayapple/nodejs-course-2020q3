const tasksRepo = require('./task.db.repository')

const getAll = boardId => tasksRepo.getAll(boardId)

const get = ids => tasksRepo.get(ids)

const create = (boardId, task) => tasksRepo.create(boardId, task)

const remove = ids => tasksRepo.remove(ids)

const update = (ids, updateForTask) => tasksRepo.update(ids, updateForTask)

module.exports = { getAll, get, create, update, remove }
