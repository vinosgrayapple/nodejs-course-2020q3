const router = require('express').Router({ mergeParams: true })
const tasksService = require('./task.service')
const { catchErrors } = require('../../lib/errors')
// get All Tasks
router.route('/').get(
  catchErrors(async (req, res) => {
    const { boardId } = req.params
    const tasks = await tasksService.getAll(boardId)
    res.json(tasks)
  })
)
// Create Task
router.route('/').post(
  catchErrors(async (req, res) => {
    const { boardId } = req.params
    const task = await tasksService.create(boardId, req.body)
    res.status(200).send(task)
  })
)
// Get task  by ID
router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params
    const task = await tasksService.get(id)
    if (!task) res.sendStatus(404)
    res.json(task)
  })
)
// Update User by ID
router.put(
  '/:id',
  catchErrors(async (req, res) => {
    const { id } = req.params
    const updateForTask = req.body
    const taskNew = await tasksService.update(id, updateForTask)
    res.status(200).send(taskNew)
  })
)
// Delete task by ID
router.delete(
  '/:id',
  catchErrors(async (req, res) => {
    const { id, boardId } = req.params
    await tasksService.remove(boardId, id)
    res.sendStatus(200)
  })
)
module.exports = router
