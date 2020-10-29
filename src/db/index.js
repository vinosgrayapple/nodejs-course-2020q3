const mongoose = require('mongoose')
const { logger } = require('../lib/mlog')

const User = require('../resources/users/user.model')
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
    logger.info('Connect to DB!')
    db.dropDatabase('task4')
    User.create({ name: 'admin', login: 'admin', password: 'admin' })
    cb()
  })
}
module.exports = { connectDB }
