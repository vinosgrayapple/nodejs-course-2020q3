const { PORT } = require('./common/config')
const app = require('./app')
const { start } = require('./common/mock-data/')

app.listen(PORT, async () => {
  await start()
  console.log(`App is running on http://localhost:${PORT}`)
})
