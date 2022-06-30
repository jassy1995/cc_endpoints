const Joi = require("joi");

function validateLoanDetail(data) {
  const schema = Joi.object({
    phone: Joi.string().required(),
    time_created: Joi.string().required(),
  });
  return schema.validate(data);
}

module.exports = validateLoanDetail;
