const Board = require('./board.model')
const createError = require('http-errors')

const getAll = () => Board.find({})

const get = _id => Board.findOne({ _id })

const create = async board => Board.create(board)

const remove = async _id => await Board.deleteOne({ _id })

const update = async (_id, boardNew) => {
  try {
    await Board.updateOne({ _id }, boardNew)
    return await get(_id)
  } catch (error) {
    throw createError(500, 'Update Board')
  }
}

module.exports = { getAll, get, create, update, remove }
