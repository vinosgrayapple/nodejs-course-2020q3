const DB = require('../../common/inMemoryDB')
const { NotFoundError } = require('../../lib/errors')

const getAll = async () => DB.getAllBoards()

const get = async id => {
  const board = await DB.getBoard(id)
  if (!board) {
    throw new NotFoundError(`The board with id: ${id} was not found`)
  }
  return board
}

const create = async board => await DB.createBoard(board)
const remove = async id => await DB.removeBoard(id)
const update = async (id, boardNew) => {
  await DB.updateBoard(id, boardNew)
  return await get(id)
}

module.exports = { getAll, get, create, update, remove }
