const Joi = require("joi");

function validateUserDetail(userObject) {
  const schema = Joi.object({
    full_name: Joi.string().required(),
    dob: Joi.string().required(),
    gender: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    residential_address: Joi.string().required(),
    profile_picture: Joi.string().required(),
    bvn: Joi.string().required(),
    nin: Joi.string().required(),
  });
  return schema.validate(userObject);
}

module.exports = validateUserDetail;
