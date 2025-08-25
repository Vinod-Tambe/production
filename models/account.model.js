const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const accountSchema = new mongoose.Schema({
  acc_add_date: {
    type: String,
    default: () => {
      const now = new Date();
      return now.toISOString().slice(0, 10).split('-').reverse().join('-');
    }
  },
  acc_own_id: {
    type: Number,
    required: true,
    default: 0,
  },
  acc_firm_id: {
    type: Number,
    required: true,
    default: 0,
  },
  acc_pan_no: {
    type: String,
    uppercase: true,
    match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    default: "",
  },
  acc_name: {
    type: String,
    required: true,
    trim: true,
    default: "",
  },
  acc_desc: {
    type: String,
    default: "",
  },
  acc_pre_acc: {
    type: String,
    default: "",
  },
  acc_bank_no: {
    type: String,
    default: "",
  },
  acc_bsr_no: {
    type: String,
    default: "",
  },
  acc_ifsc_code: {
    type: String,
    match: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    default: "",
  },
  acc_branch_name: {
    type: String,
    default: "",
  },
  acc_opening_date: {
    required: true,
    type: String, // changed to string for consistent format
  },
  acc_address: {
    type: String,
    default: "",
  },
  acc_country: {
    type: String,
    default: "",
  },
  acc_state: {
    type: String,
    default: "",
  },
  acc_city: {
    type: String,
    default: "",
  },
  acc_pincode: {
    type: String,
    match: /^[0-9]{6}$/,
    default: "",
  },
  acc_cash_balance: {
    type: Number,
    default: 0,
  },
  acc_balance_type: {
    type: String,
    enum: ["CR", "DR"],
    required: true,
    default: "DR",
  },
  acc_other_info: {
    type: String,
    default: "",
  },
});

accountSchema.plugin(AutoIncrement, { inc_field: "acc_id" });

module.exports = mongoose.model("Account", accountSchema);
