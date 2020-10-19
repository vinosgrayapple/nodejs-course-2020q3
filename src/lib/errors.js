const logger = require('./logger')
const { NOT_FOUND } = require('http-status-codes')
class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.status = NOT_FOUND
  }
}
const catchErrors = func => async (req, res, next) => {
  try {
    return await func(req, res, next)
  } catch (error) {
    logger.error(error)
    return next(error)
  }
}
module.exports = {
  NotFoundError,
  catchErrors
}
