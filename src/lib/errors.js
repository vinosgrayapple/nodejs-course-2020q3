const logger = require('./logger')
class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.status = 404
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
const catchDBErrors = func => (...params) =>
  new Promise(func.call(this, ...params)).catch(error => {
    throw new Error('error: ', error.message)
  })
module.exports = {
  NotFoundError,
  catchErrors,
  catchDBErrors
}
