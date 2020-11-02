/* eslint-disable no-unused-vars */
const express = require('express')
const swaggerUI = require('swagger-ui-express')
<<<<<<< HEAD
<<<<<<< HEAD
=======
const jwt = require('jsonwebtoken')
>>>>>>> parent of b53fc2c... Finish:task5
const path = require('path')
const YAML = require('yamljs')
const createError = require('http-errors')
<<<<<<< HEAD
const { INTERNAL_SERVER_ERROR, NOT_FOUND } = require('http-status-codes')
=======
const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED
} = require('http-status-codes')
>>>>>>> parent of b53fc2c... Finish:task5
=======
const path = require('path')
const YAML = require('yamljs')
const createError = require('http-errors')
const { INTERNAL_SERVER_ERROR, NOT_FOUND } = require('http-status-codes')
>>>>>>> parent of 0bea569... Merge pull request #6 from vinosgrayapple/development

const userRouter = require('./resources/users/user.router')
const boardRouter = require('./resources/boards/board.router')
const taskRouter = require('./resources/tasks/task.router')

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
app.use(helmet())
app.use(cors())
>>>>>>> parent of b53fc2c... Finish:task5
=======
>>>>>>> parent of 0bea569... Merge pull request #6 from vinosgrayapple/development
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
<<<<<<< HEAD
<<<<<<< HEAD

=======
app.use('/login', loginRouter)
app.use(authenticateToken)
>>>>>>> parent of b53fc2c... Finish:task5
=======

>>>>>>> parent of 0bea569... Merge pull request #6 from vinosgrayapple/development
app.use('/users', userRouter)
app.use('/boards', boardRouter)
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
<<<<<<< HEAD
<<<<<<< HEAD
  res.status(err.status).json(errObj)
})
=======
  res.status(err.status).json(`${err.status}. ${err.message}`)
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) throw createError(UNAUTHORIZED, 'No token!')

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) throw createError(UNAUTHORIZED, 'Token invalid!')
    req.user = user
    next()
  })
}
>>>>>>> parent of b53fc2c... Finish:task5

=======
  res.status(err.status).json(errObj)
})

>>>>>>> parent of 0bea569... Merge pull request #6 from vinosgrayapple/development
module.exports = app
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
