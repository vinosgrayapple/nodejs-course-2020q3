const router = require('express').Router()
const loginService = require('./login.service')
const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const { FORBIDDEN } = require('http-status-codes')

router.route('/').post(
  asyncHandler(async (req, res) => {
    const { login, password } = req.body
    console.log({ login, password })
    if (!login || !password) {
      throw createError(FORBIDDEN, 'No authorization data')
    }
    const token = await loginService.getToken({ login, password })
    res.json({ token })
  })
)

module.exports = router
