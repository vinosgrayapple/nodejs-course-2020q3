const Board = require('./board.model')
const createError = require('http-errors')
const asyncHandler = require('express-async-handler')

const getAll = asyncHandler(async () => {
  const boards = await Board.find({})
  if (!boards || boards.length === 0) {
    throw createError.NotFound('Boards not found')
  }
  return boards
})
// Get Board byId
const get = asyncHandler(async id => {
  const board = await Board.findById(id)
  if (!board) {
    throw createError.NotFound(`Board with id: ${id} not found`)
  }
  return board
})
// Create Board
const create = asyncHandler(async board => await Board.create(board))
// remove Board
const remove = asyncHandler(async id => await Board.findByIdAndRemove(id))
// update Board
const update = asyncHandler(async (id, boardNew) => {
  await Board.updateTask(id, boardNew)
  return await get(id)
})
// const get = async id => {
//   const board = await DB.getBoard(id)
//   if (!board) {
//     throw new NotFoundError(`The board with id: ${id} was not found`)
//   }
//   return board
// }

// const create = async board => await DB.createBoard(board)
// const remove = async id => await DB.removeBoard(id)
// const update = async (id, boardNew) => {
//   await DB.updateBoard(id, boardNew)
//   return await get(id)
// }

module.exports = { getAll, get, create, update, remove }
