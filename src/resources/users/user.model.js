const mongoose = require('mongoose')
const uuid = require('uuid')
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
userSchema.statics.toResponse = user => {
  const { id, name, login } = user
  return { id, name, login }
}
module.exports = mongoose.model('User', userSchema, 'users')
