const router = require('express').Router()
const boardsService = require('./board.service')
const createError = require('http-errors')
const asyncHandler = require('express-async-handler')

router.route('/').get(
  asyncHandler(async (req, res) => {
    const boards = await boardsService.getAll()
    res.json(boards)
  })
)
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
    if (!board) {
      throw createError.NotFound(`Board with id: ${id} not found`)
    }
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
    if (await boardsService.remove(id)) {
      res.sendStatus(200)
    } else {
      throw createError(404, 'Board not found')
    }
  })
)
module.exports = router
