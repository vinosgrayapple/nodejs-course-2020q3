const { connectDB } = require('./db')
const { PORT } = require('./common/config')
const app = require('./app')
connectDB(() => {
  app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
  })
})
