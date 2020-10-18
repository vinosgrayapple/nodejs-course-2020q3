const { createLogger, format, transports } = require('winston')

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
  defaultMeta: { service: 'trello' },
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.colorize(), format.simple())
    }),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
})
