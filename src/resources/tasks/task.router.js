const router = require('express').Router({ mergeParams: true })
const tasksService = require('./task.service')
// get All Tasks
router.route('/').get(async (req, res) => {
  try {
    const { boardId } = req.params
    const tasks = await tasksService.getAll(boardId)
    res.json(tasks)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
// Create Task
router.route('/').post(async (req, res) => {
  try {
    const { boardId } = req.params
    const task = await tasksService.create(boardId, req.body)
    res.status(200).send(task)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
// Get task  by ID
router.route('/:id').get(async (req, res) => {
  const { id } = req.params
  try {
    const task = await tasksService.get(id)
    if (!task) res.sendStatus(404)
    res.json(task)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
// Update User by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateForTask = req.body
    const taskNew = await tasksService.update(id, updateForTask)
    res.status(200).send(taskNew)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
// Delete task by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await tasksService.remove(id)
    res.sendStatus(200)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
module.exports = router
