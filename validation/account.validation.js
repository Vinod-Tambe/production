const Joi = require("joi");

exports.createAccountSchema = Joi.object({
  acc_own_id: Joi.number().required().messages({
    "number.base": `"Account Owner ID" must be a number`,
    "any.required": `"Account Owner ID" is required`
  }),

  acc_firm_id: Joi.number().required().messages({
    "number.base": `"Firm ID" must be a number`,
    "any.required": `"Firm ID" is required`
  }),

  acc_pan_no: Joi.string().allow("").pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).messages({
    "string.pattern.base": `"PAN Number" must be a valid PAN format (e.g., ABCDE1234F)`,
    "string.base": `"PAN Number" must be a string`,
    "any.required": `"PAN Number" is required`
  }),

  acc_name: Joi.string().required().messages({
    "string.base": `"Account Name" must be a string`,
    "any.required": `"Account Name" is required`
  }),

  acc_desc: Joi.string().allow("").messages({
    "string.base": `"Description" must be a string`
  }),

  acc_pre_acc: Joi.string().allow("").messages({
    "string.base": `"Previous Account" must be a string`
  }),

  acc_bank_no: Joi.string().allow("").messages({
    "string.base": `"Bank Account Number" must be a string`,
    "any.required": `"Bank Account Number" is required`
  }),

  acc_bsr_no: Joi.string().allow("").messages({
    "string.base": `"BSR Number" must be a string`
  }),

  acc_ifsc_code: Joi.string().allow("").pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/).messages({
    "string.pattern.base": `"IFSC Code" must be a valid IFSC format (e.g., ABCD0123456)`,
    "string.base": `"IFSC Code" must be a string`
  }),

  acc_branch_name: Joi.string().allow("").messages({
    "string.base": `"Branch Name" must be a string`
  }),

  acc_opening_date: Joi.string().required().messages({
    "date.base": `"Opening Date" must be a valid date`,
    "any.required": `"Opening Date" is required`
  }),

  acc_address: Joi.string().allow("").messages({
    "string.base": `"Address" must be a string`
  }),

  acc_country: Joi.string().allow("").messages({
    "string.base": `"Country" must be a string`
  }),

  acc_state: Joi.string().allow("").messages({
    "string.base": `"State" must be a string`
  }),

  acc_city: Joi.string().allow("").messages({
    "string.base": `"City" must be a string`
  }),

  acc_pincode: Joi.string().allow("").pattern(/^[0-9]{6}$/).messages({
    "string.pattern.base": `"Pincode" must be a 6-digit number`,
    "string.base": `"Pincode" must be a string`
  }),

  acc_cash_balance: Joi.number().optional().messages({
    "number.base": `"Cash Balance" must be a number`
  }),

  acc_balance_type: Joi.string().valid("DR", "CR").required().messages({
    "any.only": `"Balance Type" must be either 'DR' (Debit) or 'CR' (Credit)`,
    "string.base": `"Balance Type" must be a string`,
    "any.required": `"Balance Type" is required`
  }),

  acc_other_info: Joi.string().allow("").messages({
    "string.base": `"Other Info" must be a string`
  }),
});
