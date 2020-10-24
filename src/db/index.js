const mongoose = require('mongoose')
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
    db.dropDatabase('users')
    // .createIndex({ name: 1, login: 1 }, { unique: true })
    cb()
  })
}
module.exports = { connectDB }
