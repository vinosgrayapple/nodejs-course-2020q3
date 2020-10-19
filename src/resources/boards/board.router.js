const router = require('express').Router()
// const Board = require('./board.model')
// const { NotFoundError } = require('../../lib/errors')
const boardsService = require('./board.service')
// get All Boards
router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll()
  res.json(boards)
})
// Create Boards
router.route('/').post(async (req, res) => {
  try {
    const board = await boardsService.create(req.body)
    res.status(200).send(board)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
// Get Boards by ID
router.route('/:id').get(async (req, res) => {
  const { id } = req.params
  try {
    const board = await boardsService.get(id)
    res.json(board)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
// Update User by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const updateForBoard = req.body
  try {
    const boardNew = await boardsService.update(id, updateForBoard)
    res.json(boardNew)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
// Delete board by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await boardsService.remove(id)
    res.sendStatus(200)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
module.exports = router
