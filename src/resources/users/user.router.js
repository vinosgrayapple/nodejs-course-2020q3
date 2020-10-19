const router = require('express').Router()
const User = require('./user.model')
const usersService = require('./user.service')
const { catchErrors } = require('../../lib/errors')
// get All Users
router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll()
    res.json(users.map(User.toResponse))
  })
)
// Create User
router.route('/').post(
  catchErrors(async (req, res) => {
    const user = await usersService.create(req.body)
    res.json(User.toResponse(user))
  })
)
// Get user by ID
router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params
    const user = await usersService.get(id)
    res.json(User.toResponse(user))
  })
)
// Update User by ID
router.put(
  '/:id',
  catchErrors(async (req, res) => {
    const { id } = req.params
    const updateForUser = req.body

    const userNew = await usersService.update(id, updateForUser)
    res.json(User.toResponse(userNew))
  })
)
// Delete User by ID
router.delete(
  '/:id',
  catchErrors(async (req, res) => {
    const { id } = req.params
    await usersService.remove(id)
    res.sendStatus(204)
  })
)
module.exports = router
