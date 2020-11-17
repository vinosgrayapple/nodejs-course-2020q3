const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
UserSchema.pre('save', function(next) {
  const user = this
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error)
      user.password = hash
      next()
    })
  })
})
UserSchema.pre('findOneAndUpdate', function(next) {
  const user = this._update
  if (!user.password) return next()
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (error, hash) => {
      console.log(user.password, salt)
      if (error) return next(error)
      user.password = hash
      next()
    })
  })
})

UserSchema.statics.toResponse = user => {
  const { id, name, login } = user
  return { id, name, login }
}
module.exports = mongoose.model('User', UserSchema, 'users')
