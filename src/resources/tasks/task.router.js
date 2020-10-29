const router = require('express').Router({ mergeParams: true })
const tasksService = require('./task.service')
const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes')
const asyncHandler = require('express-async-handler')
const createError = require('http-errors')

router.route('/').get(
  asyncHandler(async (req, res) => {
    const { boardId } = req.params
    const tasks = await tasksService.getAll(boardId)
    res.json(tasks)
  })
)

router.route('/').post(
  asyncHandler(async (req, res) => {
    const { boardId } = req.params
    const task = await tasksService.create(boardId, req.body)
    res.status(OK).send(task)
  })
)

router.route('/:id').get(
  asyncHandler(async (req, res) => {
    const { id, boardId } = req.params
    const task = await tasksService.get({ _id: id, boardId })
    if (!task) {
      throw createError.NotFound(
        `Task with id: ${JSON.stringify({ _id: id, boardId })} not found`
      )
    }
    res.json(task)
  })
)

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id, boardId } = req.params
    const updateForTask = req.body
    const taskNew = await tasksService.update(
      { _id: id, boardId },
      updateForTask
    )
    res.status(OK).send(taskNew)
  })
)

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id, boardId } = req.params
    if (!id || !boardId) {
      throw createError(NOT_FOUND, 'Invalid id for Board or Task')
    }
    await tasksService.remove({ boardId, _id: id })
    res.sendStatus(NO_CONTENT)
  })
)

module.exports = router
