const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true, trim: true, default: "" },
  user_add_date: { type: Date, default: Date.now },
  user_firm_id: { type: String, required: true, trim: true, default: "" },
  user_own_id: { type: String, required: true, trim: true, default: "" },
  user_name_prefix: {
    type: String,
    enum: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Er.'],
    default: 'Mr.',
  },
  user_first_name: { type: String, required: true, trim: true, default: "" },
  user_middle_name: { type: String, trim: true, default: "" },
  user_last_name: { type: String, required: true, trim: true, default: "" },
  user_email: { type: String, required: true, unique: true, trim: true, default: "" },

  user_phone: { type: String, unique: true, match: /^[0-9]{10}$/, trim: true, default: "" },
  user_mobile: { type: String, unique: true, match: /^[0-9]{10}$/, trim: true, default: "" },

  user_type: {
    type: String,
    enum: ['Admin', 'Employee', 'Owner', 'Other'],
    required: true,
    default: 'Other',
  },
  user_pre_id: { type: String, trim: true, default: "" },
  user_post_id: { type: String, trim: true, required: true, unique: true, default: "" },

  user_mother_name: { type: String, trim: true, default: "" },
  user_gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
    default: 'Other',
  },
  user_cast: { type: String, trim: true, default: "" },
  user_marital_status: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    trim: true,
    default: 'Single',
  },

  user_max_qualification: { type: String, trim: true, default: "" },
  user_birth_date: { type: Date, required: true },
  user_anniversary_date: { type: Date, default: null },

  user_pan_no: {
    type: String,
    match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    uppercase: true,
    sparse: true,
    default: "",
  },
  user_gstin_no: { type: String, trim: true, default: "" },
  user_tax_no: { type: String, trim: true, default: "" },
  user_adhaar_no: {
    type: String,
    match: /^[0-9]{12}$/,
    unique: true,
    default: "",
  },

  user_bank_name: { type: String, trim: true, default: "" },
  user_bank_acc_name: { type: String, trim: true, default: "" },
  user_bank_acc_no: { type: String, trim: true, default: "" },
  user_bank_ifsc_code: {
    type: String,
    match: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    uppercase: true,
    default: "",
  },

  user_occupation: { type: String, trim: true, default: "" },
  user_income: { type: Number, min: 0, default: 0 },

  user_nominee_name: { type: String, trim: true, default: "" },
  user_nominee_relation: { type: String, trim: true, default: "" },

  user_designation: { type: String, trim: true, default: "" },
  user_google_upi: { type: String, trim: true, default: "" },
  user_other_upi: { type: String, trim: true, default: "" },
  user_payment_mode: {
    type: String,
    enum: ['Cash', 'Bank Transfer', 'UPI', 'Cheque'],
    trim: true,
    default: 'Cash',
  },

  user_shop_name: { type: String, trim: true, default: "" },
  user_office_address: { type: String, trim: true, default: "" },
  user_permanent_address: { type: String, trim: true, default: "" },
  user_current_address: { type: String, trim: true, default: "" },

  user_village: { type: String, trim: true, default: "" },
  user_ward_no: { type: String, trim: true, default: "" },
  user_tahasil: { type: String, trim: true, default: "" },
  user_city: { type: String, trim: true, default: "" },
  user_country: { type: String, trim: true, default: 'India' },
  user_pincode: { type: String, match: /^[1-9][0-9]{5}$/, default: "" },
  user_state: { type: String, trim: true, default: "" },

  user_other_info: { type: String, trim: true, default: "" },

  user_sign: { type: String, default: "" },
  user_img_id: { type: String, default: "" },
  user_pan_img_id: { type: String, default: "" },
  user_adhaar_front_img_id: { type: String, default: "" },
  user_adhaar_back_img_id: { type: String, default: "" },
});

module.exports = mongoose.model("User", userSchema);
