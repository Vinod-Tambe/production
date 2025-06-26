const Joi = require('joi');

const userValidationSchema = Joi.object({
  user_id: Joi.string().required().messages({
    'string.empty': 'User ID is required',
  }),

  user_firm_id: Joi.string().required().messages({
    'string.empty': 'Firm ID is required',
  }),

  user_own_id: Joi.string().required().messages({
    'string.empty': 'Owner ID is required',
  }),

  user_name_prefix: Joi.string().valid('Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Er.').messages({
    'any.only': 'Name prefix must be one of Mr., Mrs., Ms., Dr., Er.'
  }),

  user_first_name: Joi.string().required().messages({
    'string.empty': 'First name is required',
  }),

  user_middle_name: Joi.string().allow('').messages({
    'string.base': 'Middle name must be a string',
  }),

  user_last_name: Joi.string().required().messages({
    'string.empty': 'Last name is required',
  }),

  user_email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),

  user_phone: Joi.string().pattern(/^[0-9]{10}$/).allow('').messages({
    'string.pattern.base': 'Phone number must be a 10-digit number',
  }),

  user_mobile: Joi.string().pattern(/^[0-9]{10}$/).allow('').messages({
    'string.pattern.base': 'Mobile number must be a 10-digit number',
  }),

  user_type: Joi.string().valid('Admin', 'Employee', 'Owner', 'Other').required().messages({
    'any.only': 'User type must be Admin, Employee, Owner, or Other',
    'string.empty': 'User type is required'
  }),

  user_pre_id: Joi.string().allow('').messages({
    'string.base': 'Previous ID must be a string'
  }),
  user_post_id: Joi.string().allow('').messages({
    'string.base': 'Previous POST ID must be a string'
  }),

  user_mother_name: Joi.string().allow('').messages({
    'string.base': 'Mother\'s name must be a string',
  }),

  user_gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
    'any.only': 'Gender must be Male, Female or Other',
    'string.empty': 'Gender is required'
  }),

  user_cast: Joi.string().allow('').messages({
    'string.base': 'Caste must be a string',
  }),

  user_marital_status: Joi.string().valid('Single', 'Married', 'Divorced', 'Widowed').allow('').messages({
    'any.only': 'Marital status must be Single, Married, Divorced, or Widowed'
  }),

  user_max_qualification: Joi.string().allow('').messages({
    'string.base': 'Qualification must be a string'
  }),

  user_birth_date: Joi.date().required().messages({
    'date.base': 'Birth date must be a valid date',
    'any.required': 'Birth date is required',
  }),

  user_anniversary_date: Joi.date().optional().messages({
    'date.base': 'Anniversary date must be a valid date',
  }),

  user_pan_no: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/).optional().messages({
    'string.pattern.base': 'PAN number must be valid (e.g., ABCDE1234F)'
  }),

  user_gstin_no: Joi.string().allow('').messages({
    'string.base': 'GSTIN must be a string',
  }),

  user_tax_no: Joi.string().allow('').messages({
    'string.base': 'Tax number must be a string',
  }),

  user_adhaar_no: Joi.string().length(12).pattern(/^[0-9]{12}$/).optional().messages({
    'string.length': 'Aadhaar number must be 12 digits',
    'string.pattern.base': 'Aadhaar number must contain only digits',
  }),

  user_bank_name: Joi.string().allow('').messages({
    'string.base': 'Bank name must be a string',
  }),

  user_bank_acc_name: Joi.string().allow('').messages({
    'string.base': 'Bank account name must be a string',
  }),

  user_bank_acc_no: Joi.string().allow('').messages({
    'string.base': 'Bank account number must be a string',
  }),

  user_bank_ifsc_code: Joi.string().pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/).optional().messages({
    'string.pattern.base': 'Invalid IFSC code format',
  }),

  user_occupation: Joi.string().allow('').messages({
    'string.base': 'Occupation must be a string'
  }),

  user_income: Joi.number().min(0).optional().messages({
    'number.base': 'Income must be a number',
    'number.min': 'Income cannot be negative',
  }),

  user_nominee_name: Joi.string().allow('').messages({
    'string.base': 'Nominee name must be a string'
  }),

  user_nominee_relation: Joi.string().allow('').messages({
    'string.base': 'Nominee relation must be a string'
  }),

  user_designation: Joi.string().allow('').messages({
    'string.base': 'Designation must be a string'
  }),

  user_google_upi: Joi.string().allow('').messages({
    'string.base': 'Google UPI must be a string'
  }),

  user_other_upi: Joi.string().allow('').messages({
    'string.base': 'Other UPI must be a string'
  }),

  user_payment_mode: Joi.string().valid('Cash', 'Bank Transfer', 'UPI', 'Cheque').allow('').messages({
    'any.only': 'Payment mode must be Cash, Bank Transfer, UPI, or Cheque'
  }),

  user_shop_name: Joi.string().allow('').messages({
    'string.base': 'Shop name must be a string'
  }),

  user_office_address: Joi.string().allow('').messages({
    'string.base': 'Office address must be a string'
  }),

  user_permanent_address: Joi.string().allow('').messages({
    'string.base': 'Permanent address must be a string'
  }),

  user_current_address: Joi.string().allow('').messages({
    'string.base': 'Current address must be a string'
  }),

  user_village: Joi.string().allow('').messages({
    'string.base': 'Village must be a string'
  }),

  user_ward_no: Joi.string().allow('').messages({
    'string.base': 'Ward number must be a string'
  }),

  user_tahasil: Joi.string().allow('').messages({
    'string.base': 'Tahasil must be a string'
  }),

  user_city: Joi.string().allow('').messages({
    'string.base': 'City must be a string'
  }),

  user_country: Joi.string().default('India').messages({
    'string.base': 'Country must be a string'
  }),

  user_pincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).messages({
    'string.pattern.base': 'Pincode must be a valid 6-digit number'
  }),

  user_state: Joi.string().allow('').messages({
    'string.base': 'State must be a string'
  }),

  user_other_info: Joi.string().allow('').messages({
    'string.base': 'Other info must be a string'
  }),

  user_sign: Joi.string().optional().messages({
    'string.base': 'Signature must be a string'
  }),

  user_img_id: Joi.string().optional(),
  user_pan_img_id: Joi.string().optional(),
  user_adhaar_front_img_id: Joi.string().optional(),
  user_adhaar_back_img_id: Joi.string().optional()
});

module.exports = {
  userValidationSchema
};
