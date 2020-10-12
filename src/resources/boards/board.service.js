const boardsRepo = require('./board.memory.repository')

const getAll = () => boardsRepo.getAll()
const get = id => boardsRepo.get(id)
const create = board => boardsRepo.create(board)
const remove = id => boardsRepo.remove(id)
const update = (id, updateForBoard) => boardsRepo.update(id, updateForBoard)

module.exports = { getAll, get, create, update, remove }
