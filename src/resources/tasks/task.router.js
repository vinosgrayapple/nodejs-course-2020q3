const router = require('express').Router({ mergeParams: true })
const tasksService = require('./task.service')
// const { catchErrors } = require('../../lib/errors')
const asyncHandler = require('express-async-handler')
const createError = require('http-errors')

// get All Tasks
router.route('/').get(
  asyncHandler(async (req, res) => {
    const { boardId } = req.params
    const tasks = await tasksService.getAll(boardId)

    res.json(tasks)
  })
)
// Create Task
router.route('/').post(
  asyncHandler(async (req, res) => {
    const { boardId } = req.params
    const task = await tasksService.create(boardId, req.body)
    res.status(200).send(task)
  })
)
// Get task  by ID
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
// Update User by ID
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id, boardId } = req.params
    const updateForTask = req.body
    const taskNew = await tasksService.update(
      { _id: id, boardId },
      updateForTask
    )
    res.status(200).send(taskNew)
  })
)
// Delete task by ID
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id, boardId } = req.params
    await tasksService.remove({ boardId, _id: id })
    res.sendStatus(204)
  })
)
module.exports = router
