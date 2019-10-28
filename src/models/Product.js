const Joi = require('@hapi/joi');

const product = Joi.object({
  id: Joi.string().alphanum().required(),
  title: Joi.string().alphanum().required(),
  price: {
    currency: Joi.string().alphanum().min(3).max(5).required(),
    amount: Joi.number().required(),
    decimals: Joi.number().required(),
  },
  picture: Joi.string().alphanum().required(),
  condition: Joi.string().required(),
  free_shipping: Joi.boolean().required(),
});

module.exports = product;
