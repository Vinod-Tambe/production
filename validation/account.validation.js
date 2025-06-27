const Joi = require("joi");

exports.createAccountSchema = Joi.object({
  acc_own_id: Joi.number().required(),
  acc_firm_id: Joi.number().required(),
  acc_pan_no: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).required(),
  acc_name: Joi.string().required(),
  acc_desc: Joi.string().allow(""),
  acc_pre_acc: Joi.string().allow(""),
  acc_bank_no: Joi.string().required(),
  acc_bsr_no: Joi.string().allow(""),
  acc_ifsc_code: Joi.string().pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/),
  acc_branch_name: Joi.string().allow(""),
  acc_opening_date: Joi.date().optional(),
  acc_address: Joi.string().allow(""),
  acc_country: Joi.string().allow(""),
  acc_state: Joi.string().allow(""),
  acc_city: Joi.string().allow(""),
  acc_pincode: Joi.string().pattern(/^[0-9]{6}$/),
  acc_cash_balance: Joi.number().optional(),
  acc_balance_type: Joi.string().valid("credit", "debit").required(),
  acc_other_info: Joi.string().allow(""),
});
