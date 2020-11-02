<<<<<<< HEAD
process.on('SIGINT', () => {
  console.log('SIGINT')
  process.kill(process.pid)
})
console.log('PID: ', process.pid)
=======
const { PORT } = require('./common/config')
>>>>>>> parent of b53fc2c... Finish:task5
const { connectDB } = require('./db')
const { PORT } = require('./common/config')
const app = require('./app')
connectDB(() => {
  app.listen(PORT, () => {
<<<<<<< HEAD
    console.log(`App is running on http://localhost:${PORT}`)
=======
    logger.info(`App is running on http://localhost:${PORT}`)
>>>>>>> parent of b53fc2c... Finish:task5
  })
})

const { logger } = require('./lib/mlog')
process.on('SIGINT', () => {
  process.kill(process.pid)
})
logger.info(`PID: ${process.pid}`)
