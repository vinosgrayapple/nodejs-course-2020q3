/* eslint-disable no-unused-vars */
const express = require('express')
const app = express()
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')
const YAML = require('yamljs')
const { serve, setup } = require('swagger-ui-express')

const { morganColorLog, morganLogToFile } = require('./lib/mlog')
const error = require('./lib/errorHandling')
const { authVerify } = require('./lib/authMiddleware')
const startRoute = require('./lib/start')

const userRouter = require('./resources/users/user.router')
const boardRouter = require('./resources/boards/board.router')
const taskRouter = require('./resources/tasks/task.router')
const loginRouter = require('./resources/login/login.router')

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morganColorLog)
app.use(morganLogToFile)

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'))
app.use('/doc', serve, setup(swaggerDocument))

app.use('/', startRoute)
app.use('/login', loginRouter)
app.use(authVerify)
app.use('/users', userRouter)
app.use('/boards', boardRouter)
boardRouter.use('/:boardId/tasks', taskRouter)

app.use(error.catchRoute)
app.use(error.EndHandle)

module.exports = app

// ****** check "uncaughtException" handler
// setTimeout(() => {
//   throw Error('Oops!')
// }, 2000)
// @
// ***** check "unhandledRejection" handler
// setTimeout(() => {
//   Promise.reject(Error('OopsPromise!'))
// }, 3000)
