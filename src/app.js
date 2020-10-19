/* eslint-disable no-unused-vars */
const express = require('express')
const swaggerUI = require('swagger-ui-express')
const path = require('path')
const YAML = require('yamljs')

const userRouter = require('./resources/users/user.router')
const boardRouter = require('./resources/boards/board.router')
const taskRouter = require('./resources/tasks/task.router')
const pexit = process.exit

const { INTERNAL_SERVER_ERROR, getStatusCode } = require('http-status-codes')
const { NotFoundError } = require('./lib/errors')
const logMiddleware = require('./lib/winlogger')
const logger = require('./lib/logger')

const app = express()

process
  .on('uncaughtException', error => {
    logger.error(
      `${new Date().toUTCString()} uncaughtException:`,
      error.message
    )
    pexit(1)
  })
  .on('unhandledRejection', (reason, promise) => {
    logger.error(`${reason.message}`)
  })

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'))
app.use(express.json())
app.use(logMiddleware)

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!')
    return
  }
  next()
})

app.use('/users', userRouter)
app.use('/boards', boardRouter)
boardRouter.use('/:boardId/tasks', taskRouter)

Promise.reject(Error('Oops!'))

app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    logger.error(err.message)
    res.status(err.status).send(err.message)
    return
  }
  next(err)
})
app.use((err, req, res, _next) => {
  logger.error(err.message)
  res.status(INTERNAL_SERVER_ERROR).send(getStatusCode(INTERNAL_SERVER_ERROR))
})

module.exports = app
