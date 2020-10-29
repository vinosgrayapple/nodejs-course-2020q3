const { logger } = require('./lib/mlog')
process.on('SIGINT', () => {
  process.kill(process.pid)
})
logger.info(`PID: ${process.pid}`)
const { connectDB } = require('./db')
const { PORT } = require('./common/config')
const app = require('./app')
connectDB(() => {
  app.listen(PORT, () => {
    logger.info(`App is running on http://localhost:${PORT}`)
  })
})
