const Joi = require("joi");

const createFirmSchema = Joi.object({
  firm_name: Joi.string().trim().required().messages({
    "string.base": "Firm name must be a string",
    "string.empty": "Firm name is required",
    "any.required": "Firm name is required",
  }),

  firm_reg_no: Joi.string().trim().required().messages({
    "string.empty": "Firm registration number is required",
    "any.required": "Firm registration number is required",
  }),

  firm_shop_name: Joi.string().trim().required().messages({
    "string.empty": "Shop name is required",
    "any.required": "Shop name is required",
  }),

  firm_desc: Joi.string().allow("").messages({
    "string.base": "Firm description must be a string",
  }),

  firm_address: Joi.string().allow("").messages({
    "string.base": "Address must be a string",
  }),

  firm_city: Joi.string().allow("").messages({
    "string.base": "City must be a string",
  }),

  firm_pincode: Joi.string().pattern(/^[0-9]{6}$/).messages({
    "string.pattern.base": "Pincode must be a 6-digit number",
  }),

  firm_phone_no: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    "string.pattern.base": "Phone number must be 10 digits",
    "string.empty": "Phone number is required",
    "any.required": "Phone number is required",
  }),

  firm_email_id: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email ID is required",
    "any.required": "Email ID is required",
  }),

  firm_website: Joi.string().uri().allow("").messages({
    "string.uri": "Website must be a valid URL",
  }),

  firm_type: Joi.string().valid("Sole Proprietorship", "Partnership", "LLP", "Private Ltd", "Other").messages({
    "any.only": "Firm type must be one of: Sole Proprietorship, Partnership, LLP, Private Ltd, Other",
  }),

  firm_owner: Joi.string().trim().required().messages({
    "string.empty": "Firm owner is required",
    "any.required": "Firm owner is required",
  }),

  firm_other_info: Joi.string().allow(""),
  firm_geo_latitude: Joi.string().allow(""),
  firm_geo_longitude: Joi.string().allow(""),
  firm_whatsapp_link: Joi.string().allow(""),
  firm_facebook_link: Joi.string().allow(""),
  firm_insta_link: Joi.string().allow(""),
  firm_smtp_server: Joi.string().allow(""),
  firm_smtp_port: Joi.number().allow(null),
  firm_smtp_email: Joi.string().email().allow("").messages({
    "string.email": "SMTP Email must be a valid email",
  }),
  firm_smtp_pass: Joi.string().allow(""),

  firm_bank_name: Joi.string().allow(""),
  firm_bank_acc_no: Joi.string().allow(""),
  firm_bank_branch: Joi.string().allow(""),
  firm_bank_address: Joi.string().allow(""),
  firm_acc_holder: Joi.string().allow(""),
  firm_acc_type: Joi.string().allow(""),

  firm_ifsc_code: Joi.string().pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/).messages({
    "string.pattern.base": "IFSC Code must follow standard format like ABCD0EFG123",
  }),

  firm_pay_declaration: Joi.string().allow(""),
  firm_api_key: Joi.string().allow(""),
  firm_start_date: Joi.date().allow(null),
  firm_balance: Joi.number().messages({
    "number.base": "Balance must be a number",
  }),

  firm_balance_type: Joi.string().valid("DR", "CR").messages({
    "any.only": "Balance type must be either DR or CR",
  }),

  firm_gstin_no: Joi.string().pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).messages({
    "string.pattern.base": "GSTIN must be a valid GST number",
  }),

  firm_pan_no: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).messages({
    "string.pattern.base": "PAN number must be valid (e.g., ABCDE1234F)",
  }),

  firm_form_header: Joi.string().allow(""),
  firm_form_footer: Joi.string().allow(""),
  firm_own_sign: Joi.string().allow(""),
  firm_left_logo_id: Joi.string().allow(""),
  firm_right_logo_id: Joi.string().allow(""),
  firm_qr_logo_id: Joi.string().allow(""),
});

module.exports = {
  createFirmSchema,
};
