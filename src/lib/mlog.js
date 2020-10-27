/* eslint-disable no-unused-vars */
const morgan = require('morgan')
const chalk = require('chalk')
const rfs = require('rotating-file-stream')
const path = require('path')
const winston = require('winston')
const { createLogger, format, transports } = winston
const { combine, timestamp, label, printf } = format
const printFormat = printf(({ level, message, labels, timestamps, status }) => {
  return `${timestamps} [${labels}] ${level}: ${status} ${message}`
})
const logger = createLogger({
  format: combine(label({ label: '🔥🔥🔥 ' }), timestamp(), printFormat),
  transports: [
    new transports.Console({
      format: format.colorize()
    })
  ]
})
morgan.token('body', (req, res) => {
  const { body } = req
  const hidedPass = body.password ? body.password.replace(/./g, '*') : null
  return `Body ${JSON.stringify(
    hidedPass ? { ...body, password: hidedPass } : body
  )}`
})
morgan.token('query', (req, res) => {
  const { query } = req
  return `Query ${JSON.stringify(query)}`
})
morgan.token('splitter', _ => {
  return '\n---------------------------------------------------------\n'
})
morgan.token('statusEmoji', (req, res, args) => {
  const status = (typeof res.headersSent !== 'boolean'
  ? Boolean(res.header)
  : res.headersSent)
    ? res.statusCode
    : undefined

  // eslint-disable-next-line no-nested-ternary
  return status >= 400 ? '🔥 ' : status >= 200 ? '✔️ ' : ''
})
// log to stdout
const morganColorLog = morgan((tokens, req, res) => {
  return [
    tokens.statusEmoji(req, res),
    chalk.hex('#f78fb3').bold(`@ ${tokens.date(req, res)}`),
    chalk.hex('#34ace0').bold(tokens.method(req, res)),
    chalk.hex('#ffb142').bold(tokens.status(req, res)),
    chalk.hex('#ff5252').bold(tokens.url(req, res)),
    chalk.hex('#2ed573').bold(`${tokens['response-time'](req, res)} ms`),
    chalk.hex('#1e90ff')(tokens.body(req, res)),
    chalk.hex('#fffa65').bold(tokens.query(req, res)),
    chalk.cyan(tokens.splitter(req, res))
  ].join(' ')
})
// log to file
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, '..', 'log')
})
const morganLogToFile = morgan('combined', { stream: accessLogStream })

module.exports = { morganColorLog, morganLogToFile, logger }
