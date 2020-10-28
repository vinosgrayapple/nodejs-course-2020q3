const router = require('express').Router()
const loginService = require('./login.service')
const asyncHandler = require('express-async-handler')
router.route('/').post(
  asyncHandler(async (req, res) => {
    const { login, password } = req.body
    const token = await loginService.getToken({ login, password })
    res.json({ token })
  })
)

module.exports = router
