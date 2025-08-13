const Joi = require("joi");

// Shared validation rules
const baseSchema = {
  fin_own_id: Joi.number().integer().required(),
  fin_user_id: Joi.number().integer().required(),
  fin_firm_id: Joi.number().integer().required(),
  fin_staff_id: Joi.number().integer().required(),

  fin_prin_amt: Joi.string().required(),
  fin_no_of_emi: Joi.string().required(),

  fin_start_date: Joi.string().required().optional(), // "DD-MM-YYYY"
  fin_time_period: Joi.string().allow(""),
  fin_sms_period: Joi.string().allow(""),

  fin_freq: Joi.string().required(),
  fin_freq_type: Joi.string().required(),

  fin_roi: Joi.string().allow(""),

  fin_collec_amt: Joi.string().allow(""),
  fin_proccess_amt: Joi.string().allow(""),
  fin_fine_amt: Joi.string().allow(""),
  fin_fine_emi_no: Joi.string().allow(""),

  fin_final_amt: Joi.string().required(),
  fin_emi_amt: Joi.string().required(),

  fin_cash_amt: Joi.string().allow(""),
  fin_bank_amt: Joi.string().allow(""),
  fin_online_amt: Joi.string().allow(""),
  fin_card_amt: Joi.string().allow(""),

  fin_cash_acc_id: Joi.number().allow("").required(),
  fin_bank_acc_id: Joi.number().allow("").required(),
  fin_online_acc_id: Joi.number().allow("").required(),
  fin_card_acc_id: Joi.number().allow("").required(),

  fin_cash_info: Joi.string().allow("").required(),
  fin_bank_info: Joi.string().allow("").required(),
  fin_online_info: Joi.string().allow("").required(),
  fin_card_info: Joi.string().allow("").required(),

  fin_dr_acc_id: Joi.number().allow("").required(),
  fin_pay_info: Joi.string().allow(""),
  fin_other_info: Joi.string().allow("")
};

// Validation for creating a finance record
const createFinanceSchema = Joi.object(baseSchema);



module.exports = {
  createFinanceSchema,
};