<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 0bea569... Merge pull request #6 from vinosgrayapple/development
process.on('SIGINT', () => {
  console.log('SIGINT')
  process.kill(process.pid)
})
console.log('PID: ', process.pid)
<<<<<<< HEAD
=======
const { PORT } = require('./common/config')
>>>>>>> parent of b53fc2c... Finish:task5
=======
>>>>>>> parent of 0bea569... Merge pull request #6 from vinosgrayapple/development
const { connectDB } = require('./db')
const { PORT } = require('./common/config')
const app = require('./app')
connectDB(() => {
  app.listen(PORT, () => {
<<<<<<< HEAD
<<<<<<< HEAD
    console.log(`App is running on http://localhost:${PORT}`)
=======
    logger.info(`App is running on http://localhost:${PORT}`)
>>>>>>> parent of b53fc2c... Finish:task5
=======
    console.log(`App is running on http://localhost:${PORT}`)
>>>>>>> parent of 0bea569... Merge pull request #6 from vinosgrayapple/development
  })
})

const { logger } = require('./lib/mlog')
process.on('SIGINT', () => {
  process.kill(process.pid)
})
logger.info(`PID: ${process.pid}`)
