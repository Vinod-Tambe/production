const Joi = require('joi');

const userValidationSchema = Joi.object({
  user_firm_id: Joi.required().messages({
    'firm':'Please Select Firm',
  }),
  user_name_prefix: Joi.string().valid('Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Er.').default('Mr.').messages({
    'any.only': 'Name prefix must be one of Mr., Mrs., Ms., Dr., Er.'
  }),

  user_first_name: Joi.string().required().messages({
    'string.empty': 'First name is required',
  }),

  user_middle_name: Joi.string().allow('').optional(),

  user_last_name: Joi.string().allow('').optional(),

  user_email: Joi.string().email().allow('').messages({
    'string.email': 'Email must be a valid email address',
  }),

  user_phone: Joi.string().pattern(/^[0-9]{10}$/).allow('').messages({
    'string.pattern.base': 'Phone number must be a 10-digit number',
  }),

  user_mobile: Joi.string().pattern(/^[0-9]{10}$/).allow('').messages({
    'string.pattern.base': 'Mobile number must be a 10-digit number',
  }),

  user_type: Joi.string().default('Customer').required().messages({
    'any.only': 'User type must be Customer or Staff',
    'string.empty': 'User type is required'
  }),

  user_pre_id:  Joi.string().allow('').optional(),

  user_post_id: Joi.string().allow('').optional(),

  user_mother_name: Joi.string().allow('').optional(),

  user_gender: Joi.string().valid('Male', 'Female', 'Other').default('Other').required().messages({
    'any.only': 'Gender must be Male, Female or Other',
    'string.empty': 'Gender is required'
  }),

  user_cast: Joi.string().allow('').optional(),

  user_marital_status: Joi.string().valid('Single', 'Married', 'Divorced', 'Widowed').default('Single'),

  user_max_qualification: Joi.string().allow('').optional(),

  user_birth_date: Joi.string().required().messages({
    'date.base': 'Birth date must be a valid date',
    'any.required': 'Birth date is required',
  }),

  user_anniversary_date: Joi.string().allow(null).optional(),

  user_pan_no: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/).allow('').messages({
    'string.pattern.base': 'PAN number must be valid (e.g., ABCDE1234F)'
  }),

  user_gstin_no: Joi.string().allow('').optional(),

  user_tax_no: Joi.string().allow('').optional(),

  user_adhaar_no: Joi.string().pattern(/^[0-9]{12}$/).allow('').messages({
    'string.pattern.base': 'Aadhaar number must be 12 digits',
  }),

  user_bank_name: Joi.string().allow('').optional(),

  user_bank_acc_name: Joi.string().allow('').optional(),

  user_bank_acc_no: Joi.string().allow('').optional(),

  user_bank_ifsc_code: Joi.string().pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/).allow('').messages({
    'string.pattern.base': 'Invalid IFSC code format',
  }),

  user_occupation: Joi.string().allow('').optional(),

  user_income: Joi.number().min(0).optional().messages({
    'number.base': 'Income must be a number',
    'number.min': 'Income cannot be negative',
  }),

  user_nominee_name: Joi.string().allow('').optional(),

  user_nominee_relation: Joi.string().allow('').optional(),

  user_designation: Joi.string().allow('').optional(),

  user_google_upi: Joi.string().allow('').optional(),

  user_other_upi: Joi.string().allow('').optional(),

  user_payment_mode: Joi.string().valid('PhonePay', 'RazorPay').default('PhonePay'),

  user_shop_name: Joi.string().allow('').optional(),

  user_office_address: Joi.string().allow('').optional(),

  user_permanent_address: Joi.string().allow('').optional(),

  user_current_address: Joi.string().allow('').optional(),

  user_village: Joi.string().allow('').optional(),

  user_ward_no: Joi.string().allow('').optional(),

  user_tahasil: Joi.string().allow('').optional(),

  user_city: Joi.string().allow('').optional(),

  user_country: Joi.string().default('India').optional(),

  user_pincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).allow('').messages({
    'string.pattern.base': 'Pincode must be a valid 6-digit number'
  }),

  user_state: Joi.string().allow('').optional(),

  user_other_info: Joi.string().allow('').optional(),

  user_sign: Joi.string().allow('').optional(),
  user_img_id: Joi.string().allow('').optional(),
  user_pan_img_id: Joi.string().allow('').optional(),
  user_adhaar_front_img_id: Joi.string().allow('').optional(),
  user_adhaar_back_img_id: Joi.string().allow('').optional()
}).unknown(true);

module.exports = {
  userValidationSchema
};
