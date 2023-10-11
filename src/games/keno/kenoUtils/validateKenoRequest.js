const Joi = require("joi");

function validateKenoRequest(reqBody) {
  const schema = Joi.object({
    playerNumbers: Joi.array()
      .items(Joi.number().integer().min(1).max(80))
      .min(1)
      .max(6)
      .required(),
    betAmount: Joi.number().positive().min(5).max(100).required(),
  });

  return schema.validate(reqBody);
}

module.exports = validateKenoRequest;
