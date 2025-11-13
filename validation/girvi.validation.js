// girvi.validation.js
const Joi = require('joi');

const FIELD_LABELS = {
  girv_firm_id: 'Firm ID',
  girv_user_id: 'User ID',
  girv_staff_id: 'Staff ID',
  girv_start_date: 'Loan Start Date',
  girv_prin_amt: 'Principal Amount',
  girv_roi: 'Rate of Interest (ROI)',
  girv_roi_type: 'ROI Type',
  girv_type: 'Loan Type',
  girv_final_amt: 'Final Amount',
  girv_first_int_cr_acc_id: 'First Interest Credit Account ID',
  girv_first_int_dr_acc_id: 'First Interest Debit Account ID',
  girv_cash_acc_id: 'Cash Account ID',
  girv_bank_acc_id: 'Bank Account ID',
  girv_online_acc_id: 'Online Account ID',
  girv_card_acc_id: 'Card Account ID',
  girv_dr_acc_id: 'Debit Account ID',
  prefix: 'Loan Prefix',
  'stock_details': 'Stock Details',
};

/**
 * Common error messages
 */
const MSG = {
  required: '{{#label}} is required.',
  number: '{{#label}} must be a valid number.',
  min: '{{#label}} cannot be negative.',
  whole: '{{#label}} must be a whole number.',
  enum: '{{#label}} must be {{#valids}}.',
  prefix: '{{#label}} must be a single uppercase letter (A-Z).',
  arrayMin: '{{#label}} must contain at least one item.',
};

/**
 * Reusable schema helpers
 */
const labeled = (schema, key) => schema.label(FIELD_LABELS[key] || key);

const idField = (key) =>
  labeled(
    Joi.number().integer().min(0).default(0).messages({
      'number.base': MSG.number,
      'number.min': MSG.min,
      'number.integer': MSG.whole,
    }),
    key
  );

const amount = (key) =>
  labeled(
    Joi.number().min(0).default(0).messages({
      'number.base': MSG.number,
      'number.min': MSG.min,
    }),
    key
  );

const enlabeled = (key) =>
  labeled(Joi.number().min(0).default(0).messages({ 'number.min': MSG.min }), key);

const optionalStr = (key) =>
  labeled(Joi.string().trim().allow('').default(''), key);

/**
 * Stock Details Schema (for secured loans)
 */
const stockDetailSchema = Joi.object({
  st_firm_id: idField('st_firm_id').required().messages({ 'any.required': MSG.required }),
  st_user_id: idField('st_user_id').required().messages({ 'any.required': MSG.required }),
  st_staff_id: idField('st_staff_id').required().messages({ 'any.required': MSG.required }),

  st_metal_type: labeled(
    Joi.string().valid('gold', 'silver').required(),
    'st_metal_type'
  ).messages({
    'any.required': 'Metal Type is required.',
    'any.only': 'Metal Type must be "gold" or "silver".',
  }),

  st_item_name: labeled(Joi.string().trim().required(), 'st_item_name').messages({
    'any.required': 'Item Name is required.',
  }),

  st_quantity: labeled(Joi.number().integer().min(1).required(), 'st_quantity').messages({
    'any.required': 'Quantity is required.',
    'number.min': 'Quantity must be at least 1.',
  }),

  st_gs_weight: labeled(Joi.number().min(0.001).required(), 'st_gs_weight').messages({
    'any.required': 'Gross Weight is required.',
    'number.min': 'Gross Weight must be greater than 0.',
  }),

  st_gs_type: labeled(
    Joi.string().valid('GM', 'KG').required(),
    'st_gs_type'
  ).messages({
    'any.required': 'Gross Weight Unit is required.',
    'any.only': 'Gross Weight Unit must be "GM", "KG".',
  }),

  st_nt_weight: labeled(Joi.number().min(0).required(), 'st_nt_weight').messages({
    'any.required': 'Net Weight is required.',
    'number.min': 'Net Weight cannot be negative.',
  }),

  st_nt_type: labeled(
    Joi.string().valid('GM', 'KG').required(),
    'st_nt_type'
  ).messages({
    'any.required': 'Net Weight Unit is required.',
    'any.only': 'Net Weight Unit must be "GM", "KG".',
  }),

  st_purity: labeled(Joi.number().min(0).max(100).required(), 'st_purity').messages({
    'any.required': 'Purity is required.',
    'number.min': 'Purity cannot be negative.',
    'number.max': 'Purity cannot exceed 100%.',
  }),

  st_rate: labeled(Joi.number().min(0).required(), 'st_rate').messages({
    'any.required': 'Rate is required.',
    'number.min': 'Rate cannot be negative.',
  }),
}).options({ stripUnknown: true });

/**
 * Base Common Schema (shared between secured & unsecured)
 */
const baseGirviSchema = {
  girv_firm_id: idField('girv_firm_id').required().messages({ 'any.required': MSG.required }),
  girv_user_id: idField('girv_user_id').required().messages({ 'any.required': MSG.required }),
  girv_staff_id: idField('girv_staff_id').required().messages({ 'any.required': MSG.required }),

  girv_start_date: labeled(Joi.string().isoDate().required(), 'girv_start_date').messages({
    'any.required': MSG.required,
    'string.isoDate': 'Loan Start Date must be a valid ISO date (YYYY-MM-DD).',
  }),

  girv_prin_amt: amount('girv_prin_amt').required().messages({ 'any.required': MSG.required }),
  girv_final_amt: amount('girv_final_amt').required().messages({ 'any.required': MSG.required }),

  girv_roi: labeled(Joi.number().min(0).required(), 'girv_roi').messages({
    'any.required': MSG.required,
    'number.min': MSG.min,
  }),

  girv_roi_type: labeled(
    Joi.string().valid('monthly', 'annually').required(),
    'girv_roi_type'
  ).messages({
    'any.required': MSG.required,
    'any.only': 'ROI Type must be "monthly" or "annually".',
  }),

  girv_type: labeled(
    Joi.string().valid('unsecured', 'secured').required(),
    'girv_type'
  ).messages({
    'any.required': MSG.required,
    'any.only': 'Loan Type must be "unsecured" or "secured".',
  }),

  girv_process_per: enlabeled('girv_process_per'),
  girv_process_amt: amount('girv_process_amt'),
  girv_packet_no: optionalStr('girv_packet_no'),
  girv_locker_no: optionalStr('girv_locker_no'),
  girv_charge_per: enlabeled('girv_charge_per'),
  girv_charge_amt: amount('girv_charge_amt'),

  girv_first_int: Joi.string().valid('Y', 'N').default('N'),

  girv_first_int_cr_acc_id: idField('girv_first_int_cr_acc_id').required().messages({ 'any.required': MSG.required }),
  girv_first_int_dr_acc_id: idField('girv_first_int_dr_acc_id').required().messages({ 'any.required': MSG.required }),

  girv_cash_acc_id: idField('girv_cash_acc_id').required().messages({ 'any.required': MSG.required }),
  girv_bank_acc_id: idField('girv_bank_acc_id').required().messages({ 'any.required': MSG.required }),
  girv_online_acc_id: idField('girv_online_acc_id').required().messages({ 'any.required': MSG.required }),
  girv_card_acc_id: idField('girv_card_acc_id').required().messages({ 'any.required': MSG.required }),
  girv_dr_acc_id: idField('girv_dr_acc_id').required().messages({ 'any.required': MSG.required }),

  girv_cash_amt: amount('girv_cash_amt'),
  girv_bank_amt: amount('girv_bank_amt'),
  girv_online_amt: amount('girv_online_amt'),
  girv_card_amt: amount('girv_card_amt'),

  girv_cash_info: optionalStr('girv_cash_info'),
  girv_bank_info: optionalStr('girv_bank_info'),
  girv_online_info: optionalStr('girv_online_info'),
  girv_card_info: optionalStr('girv_card_info'),
  girv_other_info: optionalStr('girv_other_info'),
  girv_pay_info: optionalStr('girv_pay_info'),

  prefix: Joi.string()
    .pattern(/^[A-Z]$/)
    .label('Loan Prefix')
    .messages({ 'string.pattern.base': MSG.prefix })
    .optional(),
};

/**
 * CREATE SCHEMA: Unsecured Loan (No stock required)
 */
const girviUnsecuredSchema = Joi.object({
  ...baseGirviSchema,
  stock_details: Joi.array().items(stockDetailSchema).max(0).optional()
    .messages({ 'array.max': 'Stock details are not allowed for unsecured loans.' }),
}).options({ stripUnknown: true });

/**
 * CREATE SCHEMA: Secured Loan (At least 1 stock item required)
 */
const girviSecuredSchema = Joi.object({
  ...baseGirviSchema,
  stock_details: labeled(
    Joi.array().items(stockDetailSchema).min(1).required(),
    'stock_details'
  ).messages({
    'any.required': MSG.required,
    'array.min': MSG.arrayMin,
  }),
}).options({ stripUnknown: true });


// Conditional schema selection
const getGirviCreateSchema = (girv_type) => {
  return girv_type === 'secured' ? girviSecuredSchema : girviUnsecuredSchema;
};

/**
 * Remove quotes from Joi's auto-quoted labels: "User ID" → User ID
 */
const cleanMessage = (msg) => msg.replace(/"([^"]+)"/g, '$1');

/**
 * Format validation errors — NO QUOTES
 */
const formatError = (error) => {
  const errors = {};
  error.details.forEach((d) => {
    errors[d.path.join('.')] = cleanMessage(d.message);
  });
  return {
    success: false,
    message: 'Please fix the following errors:',
    errors,
  };
};

/**
 * Middleware: Validate Girvi Creation (Dynamic: Secured vs Unsecured)
 */
const validateGirviSchema = (req, res, next) => {
  const body = req.body;
  const girv_type = body.girv_type;

  // Determine schema based on loan type
  const schema = getGirviCreateSchema(girv_type);

  const { error, value } = schema.validate(body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json(formatError(error));
  }

  req.validatedGirvi = value;
  next();
};

// Export both for flexibility
module.exports = {
  validateGirviSchema,
  validateUnsecuredGirviSchema: (req, res, next) => {
    const { error, value } = girviUnsecuredSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json(formatError(error));
    req.validatedGirvi = value;
    next();
  },
  validateSecuredGirviSchema: (req, res, next) => {
    const { error, value } = girviSecuredSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json(formatError(error));
    req.validatedGirvi = value;
    next();
  },
};