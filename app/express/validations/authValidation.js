const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');

// HELPER FUNCTIONS
exports.registerSchema = (req, res, next) => {
  const schemaRules = {
    provider: Joi.string().required(),
    identity: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    organizer: Joi.string().required(),
    password: Joi.string().min(8).required(),
    acceptTerms: Joi.boolean().valid(true).required(),
  };

  const schema = Joi.object(schemaRules);

  validateRequest(req, next, schema);
};

exports.loginSchema = (req, res, next) => {
  const schema = Joi.object({
    identity: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });
  validateRequest(req, next, schema);
};

exports.verifyEmailSchema = (req, res, next) => {
  const schema = Joi.object({
    token: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};

exports.forgotPasswordSchema = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  validateRequest(req, next, schema);
};

exports.resetPasswordSchema = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(8).required(),
    passwordRepeat: Joi.string().valid(Joi.ref('password')).required(),
  });
  validateRequest(req, next, schema);
};
