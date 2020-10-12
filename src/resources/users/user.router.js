const router = require('express').Router()
const User = require('./user.model')
const usersService = require('./user.service')

// get All Users
router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll()
    // console.log('users: >>', users)
    res.json(users.map(User.toResponse))
  } catch (error) {
    res.status(404).send(error.message)
  }
})
// Create User
router.route('/').post(async (req, res) => {
  try {
    const user = await usersService.create(req.body)
    res.json(User.toResponse(user))
  } catch (error) {
    res.status(404).send(error.message)
  }
})
// Get user by ID
router.route('/:id').get(async (req, res) => {
  const { id } = req.params
  try {
    const user = await usersService.get(id)
    res.json(User.toResponse(user))
  } catch (error) {
    res.status(404).send(error.message)
  }
})
// Update User by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const updateForUser = req.body
  try {
    const userNew = await usersService.update(id, updateForUser)
    res.json(User.toResponse(userNew))
  } catch (error) {
    res.status(404).send(error.message)
  }
})
// Delete User by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await usersService.remove(id)
    res.sendStatus(204)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
module.exports = router
