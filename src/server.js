process.on('SIGINT', () => {
  console.log('SIGINT')
  process.kill(process.pid)
})
console.log('PID: ', process.pid)
const { connectDB } = require('./db')
const { PORT } = require('./common/config')
const app = require('./app')
connectDB(() => {
  app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
  })
})
