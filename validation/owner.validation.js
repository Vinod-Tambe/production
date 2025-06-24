const Joi = require("joi");

const ownerValidationSchema = Joi.object({
  own_fname: Joi.string().min(2).max(50).required(),
  own_mname: Joi.string().min(1).max(50).optional().allow(""),
  own_lname: Joi.string().min(2).max(50).required(),

  own_mobile_no: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Mobile number must be a valid 10-digit Indian number.",
    }),

  own_phone_no: Joi.string()
    .pattern(/^\d{10}$/)
    .optional()
    .messages({
      "string.pattern.base": "Phone number must be a valid 10-digit number.",
    }),

  own_city: Joi.string().max(100).required(),
  own_state: Joi.string().max(100).required(),
  own_country: Joi.string().max(100).required(),
  own_village: Joi.string().max(100).optional().allow(""),
  own_address: Joi.string().max(255).required(),

  own_login_id: Joi.string().alphanum().min(4).max(50).required(),

  own_password: Joi.string().min(6).max(100).required()
    .messages({ "string.min": "Password must be at least 6 characters long." }),

  own_confirm_password: Joi.any()
    .valid(Joi.ref("own_password"))
    .required()
    .label("Confirm password")
    .messages({
      "any.only": "Confirm password must match password.",
    }),

  own_payment_gateway: Joi.string()
    .valid("PhonePe", "Razorpay", "Paytm", "Stripe")
    .required(),
  own_merchant_id: Joi.string().max(100).required(),
  own_salt_key: Joi.string().max(100).required(),
  own_salt_index_key: Joi.string().max(10).required(),
});

const validateOwner = (data) => {
  return ownerValidationSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateOwner,
};
