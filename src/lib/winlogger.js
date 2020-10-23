const logger = require('./logger')
const moment = require('moment')
const srlze = obj => JSON.stringify(obj)
require('colors')

module.exports = (req, res, next) => {
  const { method, url, body, query } = req
  const innerBody = { ...body }
  const hideStr = str => str.replace(/./g, '*')
  if (url.includes('users') && (method === 'POST' || method === 'PUT')) {
    innerBody.password = hideStr(innerBody.password)
  }
  console.log(
    `${moment().format().cyan} ${method.red}  ${url.yellow}    Query ${
      srlze(query).green
    }  Body ${srlze(innerBody).magenta}`
  )
  logger.info(
    `${moment().format().cyan} ${method}  ${url}    Query ${srlze(
      query
    )}  Body ${srlze(innerBody)}`
  )
  next()
}
