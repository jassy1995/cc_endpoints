const Joi = require("joi");

function validatePhoneNumber(requestObj) {
  const schema = Joi.object({
    phone: Joi.string()
      .min(5)
      .pattern(
        /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/
      )
      .required(),
    provider: Joi.required(),
    channelId: Joi.required(),
  });
  return schema.validate(requestObj);
}

module.exports = validatePhoneNumber;
