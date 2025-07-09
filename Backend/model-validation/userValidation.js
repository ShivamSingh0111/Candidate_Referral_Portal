// userValidation.js
// Validation logic for User model

const Joi = require('joi');

const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

function validateUser(user) {
  return userValidationSchema.validate(user);
}

module.exports = {
  validateUser
};
