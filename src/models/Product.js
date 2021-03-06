const Joi = require('@hapi/joi');

const product = Joi.object({
  id: Joi.string().alphanum().required(),
  title: Joi.string().required(),
  description: Joi.string(),
  price: {
    currency: Joi.string().min(3).max(5).required(),
    amount: Joi.number().required(),
    decimals: Joi.number(),
  },
  picture: Joi.string().required(),
  condition: Joi.string().required(),
  free_shipping: Joi.boolean().default(false),
  sold_quantity: Joi.number(),
  address: {
    state_id: Joi.string(),
    state_name: Joi.string().required(),
  },
});

module.exports = product;
