const router = require('express').Router()
const User = require('./user.model')
const usersService = require('./user.service')
// get All Users
router.route('/').get(async (req, res) => {
  const users = await usersService.getAll()
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse))
})
// Create User
router.route('/').post(async (req, res) => {
  console.log()
  try {
    const user = await usersService.create(new User(req.body))
    res.json(User.toResponse(user))
  } catch (error) {
    res.status(404).send(error.message)
  }
})

router.route('/:id').get(async (req, res) => {
  const { id } = req.params
  try {
    const user = await usersService.get(id)
    res.json(User.toResponse(user))
  } catch (error) {
    res.status(404).send(error.message)
  }
})
// router.route('/:id').put((req, res) => {
//   throw new Error('Несмог!')
// })

module.exports = router
