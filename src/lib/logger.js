const { createLogger, format, transports } = require('winston')
const appRoot = require('app-root-path').path
module.exports = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    // new transports.Console(),
    new transports.File({
      filename: `${appRoot}/logs/error.log`,
      level: 'error'
    }),
    new transports.File({ filename: `${appRoot}/logs/combined.log` })
  ]
})
