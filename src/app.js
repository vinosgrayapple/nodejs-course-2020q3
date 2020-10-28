/* eslint-disable no-unused-vars */
const express = require('express')
const swaggerUI = require('swagger-ui-express')
const jwt = require('jsonwebtoken')
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')
const YAML = require('yamljs')
const createError = require('http-errors')
const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED
} = require('http-status-codes')

const userRouter = require('./resources/users/user.router')
const boardRouter = require('./resources/boards/board.router')
const taskRouter = require('./resources/tasks/task.router')
const loginRouter = require('./resources/login/login.router')

const { morganColorLog, morganLogToFile, logger } = require('./lib/mlog')

const app = express()

process
  .on('uncaughtException', error => {
    logger.error(error.message)
  })
  .on('unhandledRejection', (reason, promise) => {
    logger.error(`${reason.message}`)
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  })

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morganColorLog)
app.use(morganLogToFile)

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!!!!')
    return
  }
  next()
})
app.use('/login', loginRouter)
app.use('/users', authenticateToken, userRouter)
app.use('/boards', authenticateToken, boardRouter)
boardRouter.use('/:boardId/tasks', taskRouter)

app.use((req, res, next) => {
  next(createError(NOT_FOUND))
})
app.use((err, req, res, next) => {
  err.status = err.status || INTERNAL_SERVER_ERROR
  const errObj = {
    status: err.status,
    message: err.message,
    stack: err.stack
  }
  logger.error(errObj)
  res.status(err.status).json(errObj)
})

module.exports = app
//
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) return res.sendStatus(UNAUTHORIZED)

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    // console.log(err)
    if (err) return res.sendStatus(UNAUTHORIZED)
    req.user = user
    next()
  })
}
//
// @
// @
// @
// // check "uncaughtException" handler
// setTimeout(() => {
//   throw Error('Oops!')
// }, 2000)
// @
// // check "unhandledRejection" handler
// setTimeout(() => {
//   Promise.reject(Error('OopsPromise!'))
// }, 3000)
