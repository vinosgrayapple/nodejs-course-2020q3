const router = require('express').Router()
const { catchErrors } = require('../../lib/errors')
const boardsService = require('./board.service')
// get All Boards
router.route('/').get(
  catchErrors(async (req, res) => {
    const boards = await boardsService.getAll()
    res.json(boards)
  })
)
// Create Boards
router.route('/').post(
  catchErrors(async (req, res) => {
    const board = await boardsService.create(req.body)
    res.status(200).send(board)
  })
)
// Get Boards by ID
router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params
    const board = await boardsService.get(id)
    res.json(board)
  })
)
// Update User by ID
router.put(
  '/:id',
  catchErrors(async (req, res) => {
    const { id } = req.params
    const updateForBoard = req.body
    const boardNew = await boardsService.update(id, updateForBoard)
    res.json(boardNew)
  })
)
// Delete board by ID
router.delete(
  '/:id',
  catchErrors(async (req, res) => {
    const { id } = req.params
    await boardsService.remove(id)
    res.sendStatus(200)
  })
)
module.exports = router
