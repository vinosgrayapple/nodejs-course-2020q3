const mongoose = require('mongoose')
const { Schema } = mongoose
const normalize = require('normalize-mongoose')

const boardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  columns: {
    type: Array,
    default: []
  }
})
boardSchema.plugin(normalize)

module.exports = mongoose.model('Board', boardSchema, 'boards')
