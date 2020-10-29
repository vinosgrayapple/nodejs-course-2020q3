const router = require('express').Router()
const boardsService = require('./board.service')
const createError = require('http-errors')
const asyncHandler = require('express-async-handler')
const { NOT_FOUND, OK } = require('http-status-codes')

// get All Boards
router.route('/').get(
  asyncHandler(async (req, res) => {
    const boards = await boardsService.getAll()
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

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const updateForBoard = req.body
    const boardNew = await boardsService.update(id, updateForBoard)
    res.json(boardNew)
  })
)

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    if (await boardsService.remove(id)) {
      res.sendStatus(OK)
    } else {
      throw createError(NOT_FOUND, `Board with id: ${id} not found`)
    }
  })
)
module.exports = router
