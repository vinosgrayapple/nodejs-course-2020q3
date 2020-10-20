/* eslint-disable no-unused-vars */
const express = require('express')
const swaggerUI = require('swagger-ui-express')
const path = require('path')
const YAML = require('yamljs')
const createError = require('http-errors')

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
    logger.error(error.message)
  })
  .on('unhandledRejection', (reason, promise) => {
    logger.error(`${reason.message}`)
    pexit(1)
  })

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'))
app.use(express.json())
app.use(logMiddleware)

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!!!!')
    return
  }
  next()
})

app.use('/users', userRouter)
app.use('/boards', boardRouter)
boardRouter.use('/:boardId/tasks', taskRouter)

// // check "uncaughtException" handler
// setTimeout(() => {
//   throw Error('Oops!')
// }, 2000)

// // check "unhandledRejection" handler
// setTimeout(() => {
//   Promise.reject(Error('OopsPromise!'))
// }, 3000)
// app.use((err, req, res, next) => {
//   console.log('First Error Handler test error: >>>>>>>>>>>>>>>>>>>>>>>>>')
//   console.log(err instanceof NotFoundError)
//   console.log(err.message)
//   console.log(err.status)
//   console.log('===========================================================')
//   if (err instanceof NotFoundError) {
//     console.log('test error: >>>>>>>>>>>>>>>>>>>>>>>>>')
//     logger.error(err.message)
//     res.status(err.status).send(err.message)
//     return
//   }
//   next(err)
// })
// app.use((err, req, res, _next) => {
//   logger.error(err.message)
//   res.status(INTERNAL_SERVER_ERROR).send(getStatusCode(INTERNAL_SERVER_ERROR))
// })
app.use((req, res, next) => {
  next(createError(404))
})
app.use((err, req, res, next) => {
  err.status = err.status || 500
  const errObj = {
    status: err.status,
    message: err.message,
    stack: err.stack
  }
  console.log('Error status: ', err.status)
  logger.error(errObj)
  res.status(err.status).json(errObj)
})

module.exports = app
