const Datastore = require('nedb-promises')
const User = require('../resources/users/user.model')
const Board = require('../resources/boards/board.model')
const Task = require('../resources/tasks/task.model')

const db = {}
db.users = Datastore.create(/* './db/users.db' */)
db.boards = Datastore.create(/* './db/boards.db' */)
db.tasks = Datastore.create(/* './db/tasks.db' */)
;(async () => {
  const numUser = await db.users.count({})
  console.log(numUser)
  if (!numUser) {
    await db.users
      .insert([new User(), new User(), new User(), new User()])
      .catch(err => console.log(err))

    await db.boards
      .insert([new Board(), new Board(), new Board()])
      .catch(err => console.log(err))
    const boards = await db.boards.find({})
    boards.forEach(async board => {
      db.tasks.insert([
        new Task({
          title: 'Hello',
          description: 'lorem parabellum',
          boardId: board.id,
          columnId: board.columns[0].id
        })
      ])
    })
  }
})()

const getAllUsers = async () => await db.users.find({})

const getUser = async id => await db.users.findOne({ id })

const createUser = async user => {
  const newUser = new User(user)
  await db.users.insert(newUser)
  return newUser
}

const removeUser = async id => {
  // const tasks = await db.tasks.find({ userId: id })
  await db.tasks.update(
    { userId: id },
    { $set: { userId: null } },
    { multi: true }
  )
  await db.users.remove({ id })
}

const updateUser = async (id, userNew) =>
  await db.users.update({ id }, { $set: userNew }, { returnUpdatedDocs: true })
// =======================BOARDS=======================================================
const getAllBoards = async () => await db.boards.find({})
const getBoard = async id => await db.boards.findOne({ id })

const createBoard = async board => {
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
  task.boardId = boardId
  const newTask = new Task(task)
  await db.tasks.insert(newTask)
  return newTask
}
const removeTask = async (boardId, id) => {
  await db.tasks.remove({ boardId, id })
}
const updateTask = async (id, taskNew) => {
  await db.tasks.update({ id }, { $set: taskNew }, { returnUpdatedDocs: true })
}
module.exports = {
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
