const { connectDB } = require('./db')
const { PORT } = require('./common/config')
const app = require('./app')
const { start } = require('./common/mock-data/')
connectDB(() => {
  app.listen(PORT, async () => {
    await start()
    console.log(`App is running on http://localhost:${PORT}`)
  })
})
