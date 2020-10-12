const uuid = require('uuid')
const Columns = require('./column.model')
class Board {
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = [new Columns()]
  } = {}) {
    this.id = id
    this.title = title
    this.columns = columns
  }
}

module.exports = Board
