const mocker = require('mocker-data-generator').default
const Datastore = require('nedb-promises')
const Task = require('../../resources/tasks/task.model')
const Users = require('../../resources/users/user.model')
const users = [
  new Users({ name: 'User1', login: 'admin', password: 'admin' }),
  new Users({ name: 'User1', login: 'admin', password: 'admin' })
]
users.forEach(user => user.save())
const db = {}
db.users = Datastore.create(/* './db/users.db' */)
db.boards = Datastore.create(/* './db/boards.db' */)
db.tasks = Datastore.create(/* './db/tasks.db' */)

const taskShema = {
  id: {
    faker: 'random.uuid'
  },
  title: {
    eval: 'casual.full_name'
  },
  order: {
    chance: 'integer({"min": 1, "max": 10})'
  },
  description: {
    chance: 'sentence'
  },
  userId: {
    faker: 'random.uuid'
  }
}
const boardsShema = {
  id: { faker: 'random.uuid' },
  title: {
    function: ((counter = 0) => () => `BOARD ${++counter}`)()
  },
  columns: [
    {
      function() {
        return {
          id: this.faker.random.uuid(),
          title: this.faker.name.findName(),
          order: this.chance.integer({ min: 0, max: 100 })
        }
      },
      length: 3
    }
  ]
}
const usersShema = {
  id: {
    faker: 'random.uuid'
  },
  name: {
    faker: 'name.firstName'
  },
  login: {
    faker: 'internet.userName'
  },
  password: {
    faker: 'internet.password'
  },
  email: {
    faker: 'internet.email'
  }
}
const taskData = mocker().schema('tasks', taskShema, 1)
const boardsData = mocker().schema('boards', boardsShema, 30)
const usersData = mocker().schema('users', usersShema, 4)
async function start() {
  const numUser = await db.users.count({})
  if (!numUser) {
    await db.users
      .insert((await usersData.build()).users)
      .catch(err => console.error(err))
    await db.boards
      .insert((await boardsData.build()).boards)
      .catch(err => console.error(err))
    const boards = await db.boards.find({})
    boards.forEach(async board => {
      db.tasks.insert([
        new Task({
          ...(await taskData.build()).tasks[0],
          boardId: board.id,
          columnId: board.columns[0].id
        })
      ])
    })
  }
}
module.exports = { db, start }
