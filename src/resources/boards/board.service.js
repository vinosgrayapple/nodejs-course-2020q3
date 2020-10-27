const boardsRepo = require('./board.db.repository')
const taskRepo = require('../tasks/task.db.repository')
const createError = require('http-errors')

const getAll = () => boardsRepo.getAll()
const get = _id => boardsRepo.get(_id)
const create = board => boardsRepo.create(board)
const remove = async _id => {
  if ((await boardsRepo.remove(_id)).ok) {
    try {
      return await taskRepo.removeByBoardId(_id)
    } catch (error) {
      throw createError(500, 'trouble with remove task with board id')
    }
  }
}

const update = (id, updateForBoard) => boardsRepo.update(id, updateForBoard)

module.exports = { getAll, get, create, update, remove }
