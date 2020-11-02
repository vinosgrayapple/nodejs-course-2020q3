const mongoose = require('mongoose')
const { Schema } = mongoose
const userSchema = new Schema({
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
