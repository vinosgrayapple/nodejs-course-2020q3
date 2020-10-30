const { PORT } = require('./common/config')
const { logger } = require('./lib/mlog')
const { connectDB } = require('./db')
const app = require('./app')

connectDB(() => {
  app.listen(PORT, () => {
    logger.info(`App is running on http://localhost:${PORT}`)
    logger.info(`Server running with PID: ${process.pid}`)
  })
})
