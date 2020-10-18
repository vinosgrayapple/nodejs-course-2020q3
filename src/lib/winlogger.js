const logger = require('./logger')
const moment = require('moment')
const srlze = obj => JSON.stringify(obj)
require('colors')

module.exports = (req, res, next) => {
  const { method, url, body, query } = req
  console.log(
    `${moment().format().cyan} ${method.red}  ${url.yellow}    Query ${
      srlze(query).green
    }  Body ${srlze(body).magenta}`
  )
  logger.info(
    `${moment().format().cyan} ${method}  ${url}    Query ${srlze(
      query
    )}  Body ${srlze(body)}`
  )
  next()
}
