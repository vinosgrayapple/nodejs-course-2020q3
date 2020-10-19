const DB = require('../../common/inMemoryDB')
const TASKS = 'tasks'
const { NotFoundError } = require('../../lib/errors')

const getAll = async boardId => DB.getAll(TASKS, boardId)

const get = async id => {
  const task = await DB.getTask(id)
  if (!task) {
    throw new NotFoundError(`User with id: "${id}"  Not Found`)
  }
  return task
}

const create = async (boardId, task) => await DB.createTask(boardId, task)
const remove = async (boardId, id) => await DB.removeTask(boardId, id)
const update = async (id, taskNew) => {
  await DB.updateTask(id, taskNew)
  return await get(id)
}

module.exports = { getAll, get, create, update, remove }
