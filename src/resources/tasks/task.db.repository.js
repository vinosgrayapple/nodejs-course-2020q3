const Task = require('./task.model')

const getAll = async boardId => Task.find({ boardId })

const get = async ids => Task.findOne(ids)

const create = async (boardId, task) => Task.create({ ...task, boardId })

const remove = async ids => Task.deleteOne(ids)

const update = async (ids, taskNew) => {
  await Task.updateOne(ids, taskNew)
  return await get(ids)
}

const removeByBoardId = async boardId => (await Task.deleteMany({ boardId })).ok

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
