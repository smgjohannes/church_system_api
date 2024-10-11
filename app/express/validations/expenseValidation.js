const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');

exports.createSchema = (req, res, next) => {
  const schema = Joi.object({
    transaction_reference: Joi.string().required(),
    account: Joi.string()
      .valid('Offering', 'Pastoral Fund', 'Tithe', 'Contribution', 'Other')
      .optional(),
    amount: Joi.number().positive().required(),
    payment_date: Joi.date().iso().required(),

    description: Joi.string().optional(),
  });

  validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
  const schema = Joi.object({
    transaction_reference: Joi.string().optional(),
    account: Joi.string()
      .valid('Offering', 'Pastoral Fund', 'Tithe', 'Contribution', 'Other')
      .optional(),
    payment_date: Joi.number().positive().optional(),
    amount: Joi.number().positive().optional(),

    description: Joi.string().optional(),
  }).min(1);

  validateRequest(req, next, schema);
};
