const Board = require('./board.model')
const createError = require('http-errors')

// Get All Board
const getAll = () => Board.find({})

// Get Board byId
const get = _id => Board.findOne({ _id })

// Create Board
const create = async board => Board.create(board)

// remove Board
const remove = async _id => await Board.deleteOne({ _id })

// update Board
const update = async (_id, boardNew) => {
  try {
    await Board.updateOne({ _id }, boardNew)
    return await get(_id)
  } catch (error) {
    throw createError(500, 'Update Board')
  }
}

module.exports = { getAll, get, create, update, remove }
