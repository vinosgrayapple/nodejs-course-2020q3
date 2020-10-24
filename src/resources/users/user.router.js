const router = require('express').Router()
const User = require('./user.model')
const usersService = require('./user.service')
const createError = require('http-errors')
const { OK, NOT_FOUND } = require('http-status-codes')
const asyncHandler = require('express-async-handler')

// get All Users
router.route('/').get(
  asyncHandler(async (req, res) => {
    const users = await usersService.getAll()
    res.status(OK).json(users.map(User.toResponse))
  })
)
// Create User
router.route('/').post(
  asyncHandler(async (req, res) => {
    const user = await usersService.create(req.body)
    res.json(User.toResponse(user))
  })
)
// Get user by ID
router.route('/:id').get(
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = await usersService.get(id)
    res.json(User.toResponse(user))
  })
)
// Update User by ID
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const updateForUser = req.body

    const userNew = await usersService.update(id, updateForUser)
    res.json(User.toResponse(userNew))
  })
)
// Delete User by ID
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const userIsReamoved = await usersService.remove(id)
    if (userIsReamoved) {
      res.status(204).send('User has been Deleted')
    } else {
      throw createError(NOT_FOUND, 'User for deletion not found')
    }
  })
)
module.exports = router
