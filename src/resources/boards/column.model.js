const uuid = require('uuid')

class Columns {
  constructor({ id = uuid(), title = 'COLUMNS', order = 0 } = {}) {
    this.id = id
    this.title = title
    this.order = order
  }
  // static toResponse(column) {
  //   return column
  // }
}

module.exports = Columns
