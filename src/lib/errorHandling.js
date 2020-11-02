const createError = require('http-errors')
const { logger } = require('./mlog')
const { INTERNAL_SERVER_ERROR, NOT_FOUND } = require('http-status-codes')
process
  .on('uncaughtException', error => {
    logger.error(error.message)
  })
  .on('unhandledRejection', reason => {
    logger.error(`${reason.message}`)
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  })
function catchRoute(req, res, next) {
  next(createError(NOT_FOUND))
}

// eslint-disable-next-line no-unused-vars
function EndHandle(err, req, res, _next) {
  err.status = err.status || INTERNAL_SERVER_ERROR
  const errObj = {
    status: err.status,
    message: err.message,
    stack: err.stack
  }
  logger.error(errObj)
  res.status(err.status).json(`${err.status}. ${err.message}`)
}
module.exports = {
  EndHandle,
  catchRoute
}
