// candidateValidation.js
// Validation logic for Candidate model

const Joi = require('joi');

const candidateValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  jobTitle: Joi.string().required(),
  status: Joi.string().valid('Pending', 'Reviewed', 'Hired'),
  resumeUrl: Joi.string().uri().allow('')
});

function validateCandidate(candidate) {
  return candidateValidationSchema.validate(candidate);
}

module.exports = {
  validateCandidate
};
