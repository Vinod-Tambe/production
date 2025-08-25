const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const firmSchema = new mongoose.Schema({
  firm_add_date: {
    type: String,
    default: () => {
      const now = new Date();
      return now.toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    },
  },
  firm_own_id: {
    type: Number,
    required: true,
    default: 0,
  },
  firm_name: {
    type: String,
    required: true,
    trim: true,
    default: "",
  },
  firm_reg_no: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    sparse: true,
    default: "",
  },
  firm_shop_name: {
    type: String,
    required: true,
    trim: true,
    default: "",
  },
  firm_desc: {
    type: String,
    trim: true,
    default: "",
  },
  firm_address: {
    type: String,
    trim: true,
    default: "",
  },
  firm_city: {
    type: String,
    trim: true,
    default: "",
  },
  firm_pincode: {
    type: String,
    match: /^[0-9]{6}$/,
    default: "",
  },
  firm_phone_no: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/,
    default: "",
  },
  firm_email_id: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /\S+@\S+\.\S+/,
    default: "",
  },
  firm_website: {
    type: String,
    trim: true,
    default: "",
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
    default: "",
  },
  firm_other_info: {
    type: String,
    default: "",
  },
  firm_geo_latitude: {
    type: String,
    default: "",
  },
  firm_geo_longitude: {
    type: String,
    default: "",
  },
  firm_whatsapp_link: {
    type: String,
    default: "",
  },
  firm_facebook_link: {
    type: String,
    default: "",
  },
  firm_insta_link: {
    type: String,
    default: "",
  },
  firm_smtp_server: {
    type: String,
    default: "",
  },
  firm_smtp_port: {
    type: Number,
    default: 0,
  },
  firm_smtp_email: {
    type: String,
    default: "",
  },
  firm_smtp_pass: {
    type: String,
    default: "",
  },
  firm_bank_name: {
    type: String,
    default: "",
  },
  firm_bank_acc_no: {
    type: String,
    default: "",
  },
  firm_bank_branch: {
    type: String,
    default: "",
  },
  firm_bank_address: {
    type: String,
    default: "",
  },
  firm_acc_holder: {
    type: String,
    default: "",
  },
  firm_acc_type: {
    type: String,
    default: "",
  },
  firm_ifsc_code: {
    type: String,
    match: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    default: "",
  },
  firm_pay_declaration: {
    type: String,
    default: "",
  },
  firm_api_key: {
    type: String,
    default: "",
  },
  firm_start_date: {
    required:true,
    type: String,
  },
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
    default: "",
  },
  firm_pan_no: {
    type: String,
    match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    default: "",
  },
  firm_form_header: {
    type: String,
    default: "",
  },
  firm_form_footer: {
    type: String,
    default: "",
  },
  firm_own_sign: {
    type: String,
    default: "",
  },
  firm_left_logo_id: {
    type: String,
    default: "",
  },
  firm_right_logo_id: {
    type: String,
    default: "",
  },
  firm_qr_code_id: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,
});

firmSchema.plugin(AutoIncrement, { inc_field: 'firm_id' });

module.exports = mongoose.model("Firm", firmSchema);
