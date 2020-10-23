const Task = require('./task.model')
const createError = require('http-errors')
const asyncHandler = require('express-async-handler')

const getAll = asyncHandler(async () => {
  const tasks = await Task.find({})
  if (!tasks || tasks.length === 0) {
    throw createError.NotFound('Tasks not found')
  }
  return tasks
})
// Get Task byId
const get = asyncHandler(async id => {
  const task = await Task.findById(id)
  if (!task) {
    throw createError.NotFound(`Task with id: ${id} not found`)
  }
  return task
})
// Create Task
const create = asyncHandler(async (boardId, task) => {
  const taskCreate = { ...task, ...boardId }
  await Task.create(taskCreate)
})
// remove Task
const remove = asyncHandler(
  async (boardId, id) => await Task.deleteOne({ boardId, _id: id })
)

// const create = async (boardId, task) => await Task.createTask(boardId, task)
const update = asyncHandler(async (id, taskNew) => {
  await Task.updateTask({ _id: id }, taskNew)
  return await get(id)
})

module.exports = { getAll, get, create, update, remove }
