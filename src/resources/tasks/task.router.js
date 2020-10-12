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
    console.log('task-create => req.params :>> ', req.params)
    console.log('boardId :>> ', boardId)
    const task = await tasksService.create(boardId, req.body)
    res.json(task)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
// Get task  by ID
router.route('/:id').get(async (req, res) => {
  const { id, boardId } = req.params
  console.log('taskRouter, getTask')
  try {
    const task = await tasksService.get(boardId, id)
    res.json(task)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
// Update User by ID
router.put('/:id', async (req, res) => {
  const { id, boardId } = req.params
  const updateForTask = req.body
  try {
    const taskNew = await tasksService.update(boardId, id, updateForTask)
    res.json(taskNew)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
// Delete task by ID
router.delete('/:id', async (req, res) => {
  const { id, boardId } = req.params
  try {
    await tasksService.remove(id, boardId)
    res.sendStatus(200)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
module.exports = router
