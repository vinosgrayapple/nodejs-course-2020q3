const { NOT_FOUND, getStatusCode } = require('http-status-codes')
class EntityValidationError extends Error {
  constructor() {
    super()
    this.status = NOT_FOUND
    this.text = getStatusCode(this.status)
  }
}

module.exports = {
  EntityValidationError
}
