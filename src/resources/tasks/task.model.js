const mongoose = require('mongoose')
const { Schema } = mongoose
const uuid = require('uuid')
const taskSchema = new Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: String
  },
  boardId: {
    type: String
  },
  columnId: {
    type: String
  }
})

module.exports = mongoose.model('Task', taskSchema, 'tasks')
