const { NOT_FOUND } = require('http-status-codes')
class EntityValidationError extends Error {
  constructor(message) {
    super(message)
    this.status = NOT_FOUND
    this.message = message
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super()
    this.message = message
    this.status = NOT_FOUND
  }
}

module.exports = {
  NotFoundError,
  EntityValidationError
}
