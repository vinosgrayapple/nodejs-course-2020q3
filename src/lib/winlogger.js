const logger = require('./logger')
const srlze = obj => JSON.stringify(obj)
require('colors')

module.exports = (req, res, next) => {
  const { method, url, body, query } = req
  logger.info(`${method}  ${url}    Query ${srlze(query)}  Body ${srlze(body)}`)
  next()
}
