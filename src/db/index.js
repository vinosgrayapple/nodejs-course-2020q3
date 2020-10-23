const mongoose = require('mongoose')
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
    // await db.dropCollection('users')
    /* await db
      .collection('users')
      .createIndex({ name: 1, login: 1 }, { unique: true }) */
    cb()
  })
}
module.exports = { connectDB }
