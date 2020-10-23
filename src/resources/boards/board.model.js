const mongoose = require('mongoose')
const { Schema } = mongoose
const uuid = require('uuid')
const boardSchema = new Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: {
    type: String
  } /* ,
  columns: {
    type: Array,
    default: []
  } */
})

module.exports = mongoose.model('Board', boardSchema, 'boards')

// const uuid = require('uuid')
// const Columns = require('./column.model')
// class Board {
//   constructor({
//     id = uuid(),
//     title = 'BOARD',
//     columns = [new Columns()]
//   } = {}) {
//     this.id = id
//     this.title = title
//     this.columns = columns
//   }
// }

// module.exports = Board
