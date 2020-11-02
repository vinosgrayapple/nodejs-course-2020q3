const Task = require('./task.model')

// Get ALL Tasks
const getAll = async boardId => Task.find({ boardId })

// Get Task byId
const get = async ids => Task.findOne(ids)

// Create Task
const create = async (boardId, task) => Task.create({ ...task, boardId })

// remove Task
const remove = async ids => Task.deleteOne(ids)

// const create = async (boardId, task) => await Task.createTask(boardId, task)
const update = async (ids, taskNew) => {
  await Task.updateOne(ids, taskNew)
  return await get(ids)
}
// remove by board ID
const removeByBoardId = async boardId => (await Task.deleteMany({ boardId })).ok
// clear UserId after Delete User
const clearUserIdAfterDelUser = async userId =>
  (await Task.updateMany({ userId }, { userId: null })).ok

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  removeByBoardId,
  clearUserIdAfterDelUser
}
