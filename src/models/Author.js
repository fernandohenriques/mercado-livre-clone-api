const Joi = require('@hapi/joi');

const author = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
});

module.exports = author;
