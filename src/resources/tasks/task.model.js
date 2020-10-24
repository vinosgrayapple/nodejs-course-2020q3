const mongoose = require('mongoose')
const { Schema } = mongoose
const normalize = require('normalize-mongoose')

const taskSchema = new Schema({
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
taskSchema.plugin(normalize)

module.exports = mongoose.model('Task', taskSchema, 'tasks')
