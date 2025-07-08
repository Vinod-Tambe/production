const { required } = require("joi");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const firmSchema = new mongoose.Schema({
  firm_add_date: {
    type: Date,
    default: Date.now,
  },
  firm_own_id: {
    type: Number,
    required: true,
  },
  firm_name: {
    type: String,
    required: true,
    trim: true,
  },
  firm_reg_no: {
    type: String,
    required:true,
    trim: true,
    unique: true,
    sparse: true, // allows multiple docs with null
  },
  firm_shop_name: {
    type: String,
    required: true,
    trim: true,
  },
  firm_desc: {
    type: String,
    trim: true,
  },
  firm_address: {
    type: String,
    trim: true,
  },
  firm_city: {
    type: String,
    trim: true,
  },
  firm_pincode: {
    type: String,
    match: /^[0-9]{6}$/,
  },
  firm_phone_no: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/,
  },
  firm_email_id: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /\S+@\S+\.\S+/,
  },
  firm_website: {
    type: String,
    trim: true,
  },
  firm_type: {
    type: String,
    enum: ["Sole Proprietorship", "Partnership", "LLP", "Private Ltd", "Other"],
    default: "Other",
  },
  firm_owner: {
    type: String,
    required: true,
    trim: true,
  },
  firm_other_info: String,
  firm_geo_latitude: String,
  firm_geo_longitude: String,
  firm_whatsapp_link: String,
  firm_facebook_link: String,
  firm_insta_link: String,
  firm_smtp_server: String,
  firm_smtp_port: Number,
  firm_smtp_email: String,
  firm_smtp_pass: String,
  firm_bank_name: String,
  firm_bank_acc_no: String,
  firm_bank_branch: String,
  firm_bank_address: String,
  firm_acc_holder: String,
  firm_acc_type: {
    type: String,
  },
  firm_ifsc_code: {
    type: String,
    match: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  },
  firm_pay_declaration: String,
  firm_api_key: String,
  firm_start_date: Date,
  firm_balance: {
    type: Number,
    default: 0,
  },
  firm_balance_type: {
    type: String,
    enum: ["DR", "CR"],
    default: "CR",
  },
  firm_gstin_no: {
    type: String,
    match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  },
  firm_pan_no: {
    type: String,
    match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  },
  firm_form_header: String,
  firm_form_footer: String,
  firm_own_sign: String,
  firm_left_logo_id: String,
  firm_right_logo_id: String,
  firm_qr_code_id: String,
}, {
  timestamps: true,
});

// Auto-increment firm_id
firmSchema.plugin(AutoIncrement, { inc_field: 'firm_id' });

const Firm = mongoose.model("Firm", firmSchema);
module.exports = Firm;
