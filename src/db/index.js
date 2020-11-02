const mongoose = require('mongoose')
<<<<<<< HEAD
=======
const { logger } = require('../lib/mlog')

const User = require('../resources/users/user.model')
>>>>>>> parent of b53fc2c... Finish:task5
mongoose.set('useFindAndModify', false)
const { MONGO_CONNECTION_STRING } = require('../common/config')
const connectDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', async () => {
    console.log('Connect to DB!')
    db.dropDatabase('task4')
<<<<<<< HEAD
=======
    User.create({ name: 'admin', login: 'admin', password: 'admin' })
>>>>>>> parent of b53fc2c... Finish:task5
    cb()
  })
}
module.exports = { connectDB }
