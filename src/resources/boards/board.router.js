const router = require('express').Router()
// const { catchErrors } = require('../../lib/errors')
const boardsService = require('./board.service')
const createError = require('http-errors')
const asyncHandler = require('express-async-handler')

// get All Boards
router.route('/').get(
  asyncHandler(async (req, res) => {
    const boards = await boardsService.getAll()
    if (!boards || boards.length === 0) {
      throw createError.NotFound('Boards not found')
    }
    res.json(boards)
  })
)
// Create Boards
router.route('/').post(
  asyncHandler(async (req, res) => {
    const board = await boardsService.create(req.body)

    res.send(board)
  })
)
// Get Boards by ID
router.route('/:id').get(
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const board = await boardsService.get(id)
    res.json(board)
  })
)
// Update User by ID
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const updateForBoard = req.body
    const boardNew = await boardsService.update(id, updateForBoard)
    res.json(boardNew)
  })
)
// Delete board by ID
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    await boardsService.remove(id)
    res.sendStatus(200)
  })
)
module.exports = router
