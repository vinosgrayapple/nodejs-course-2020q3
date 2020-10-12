const uuid = require('uuid')

class Task {
  constructor({
    id = uuid(),
    title = 'Finish Course NodeJS',
    order = 0,
    description = 'work!work!work!',
    userId = null, // assignee
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id
    this.title = title
    this.order = order
    this.description = description
    this.userId = userId
    this.boardId = boardId
    this.columnId = columnId
  }
}

module.exports = Task
