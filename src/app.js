/* eslint-disable no-unused-vars */
const express = require('express')
const { INTERNAL_SERVER_ERROR, getStatusCode } = require('http-status-codes')
const { EntityValidationError } = require('./lib/errors')
const swaggerUI = require('swagger-ui-express')
const path = require('path')
const morgan = require('morgan')
const YAML = require('yamljs')
const userRouter = require('./resources/users/user.router')
const boardRouter = require('./resources/boards/board.router')
const taskRouter = require('./resources/tasks/task.router')
// const logMiddleware = require('./lib/winlogger')
const logger = require('./lib/logger')
const app = express()
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'))
app.use(express.json())
morgan.token('body', req => `Body${JSON.stringify(req.body)}`)
morgan.token('query', req => `Query${JSON.stringify(req.query)}`)
app.use(morgan('[:date[clf]]  ":method :url" - :status - :body :query'))

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

app.use((err, req, res, next) => {
  if (err instanceof EntityValidationError) {
    logger.error(err.stack)
    res.status(err.status).send(err.text)
  }
  next(err)
})
app.use((err, req, res, _next) => {
  logger.error(new Date(), err.message)
  res.status(INTERNAL_SERVER_ERROR).send(getStatusCode(INTERNAL_SERVER_ERROR))
})
module.exports = app
