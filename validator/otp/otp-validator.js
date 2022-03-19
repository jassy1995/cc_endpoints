const Joi = require("joi");

function validatePhoneNumber(phone) {
  const schema = Joi.object({
    phone: Joi.string()
      .min(5)
      .pattern(
        /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/
      )
      .required(),
  });
  return schema.validate(phone);
}

module.exports = validatePhoneNumber;
