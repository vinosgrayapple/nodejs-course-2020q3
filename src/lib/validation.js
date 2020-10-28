const Joi = require('joi')
const createError = require('http-errors')

function validateUserData(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string()
      .min(6)
      .required()
  })
  validateRequest(req, next, schema)
}

function validUserDataForUpdate(req, res, next) {
  const schemaRules = {
    name: Joi.string().empty(''),
    login: Joi.string().empty(''),
    password: Joi.string().empty('')
  }

  // // only admins can update role
  // if (req.user.role === 'Admin') {
  //   schemaRules.role = Joi.string()
  //     .valid('Admin', 'User')
  //     .empty('')
  // }

  const schema = Joi.object(schemaRules)
  validateRequest(req, next, schema)
}

// helper functions

function validateRequest(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  }
  const { error, value } = schema.validate(req.body, options)
  if (error) {
    return next(
      createError(
        418,
        `Validation error: ${error.details.map(x => x.message).join(', ')}`
      )
    )
  }
  req.body = value
  return next()
}
module.exports = { validateUserData, validUserDataForUpdate }
