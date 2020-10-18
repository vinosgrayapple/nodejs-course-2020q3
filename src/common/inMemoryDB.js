const { db } = require('./mock-data')
const User = require('../resources/users/user.model')
const Board = require('../resources/boards/board.model')
const Task = require('../resources/tasks/task.model')
// const { EntityValidationError } = require('../lib/errors')
// =======================USERS=======================================================
const getAll = async (entity, id = null) =>
  await db[entity].find({ boardId: id })

const getAllUsers = async () => await db.users.find({})
const getUser = async id => await db.users.findOne({ id })
const createUser = async user => {
  const newUser = new User(user)
  await db.users.insert(newUser)
  return newUser
}
const removeUser = async id => {
  await db.tasks.update(
    { userId: id },
    { $set: { userId: null } },
    { multi: true }
  )
  await db.users.remove({ id })
}
const updateUser = async (id, userNew) =>
  await db.users.update({ id }, { $set: userNew }, { returnUpdatedDocs: true })

// throw Error('Oops!')

// =======================BOARDS=======================================================
const getAllBoards = async () => await db.boards.find({})
const getBoard = async id => await db.boards.findOne({ id })

const createBoard = async board => {
  if (Object.keys(board).length === 0) {
    throw new Error('нет данных для создания Board')
  }
  const newboard = new Board(board)
  await db.boards.insert(newboard)
  return newboard
}
const removeBoard = async id => {
  await db.tasks.remove({ boardId: id }, { multi: true })
  await db.boards.remove({ id })
}
const updateBoard = async (id, boardNew) =>
  await db.boards.update(
    { id },
    { $set: boardNew },
    { returnUpdatedDocs: true }
  )
// =======================Tasks=======================================================
const getAllTasks = async boardId => await db.tasks.find({ boardId })
const getTask = async id => await db.tasks.findOne({ id })

const createTask = async (boardId, task) => {
  const board = await db.boards.findOne({ id: boardId })
  if (!!board) {
    task.boardId = boardId
    const newTask = new Task(task)
    await db.tasks.insert(newTask)
    return newTask
  }
}
const removeTask = async (boardId, id) => {
  await db.tasks.remove({ boardId, id })
}
const updateTask = async (id, taskNew) => {
  await db.tasks.update({ id }, { $set: taskNew }, { returnUpdatedDocs: true })
}
// =====================================================================
module.exports = {
  getAll,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
  getAllBoards,
  getBoard,
  createBoard,
  removeBoard,
  updateBoard,
  getAllTasks,
  getTask,
  createTask,
  removeTask,
  updateTask
}
