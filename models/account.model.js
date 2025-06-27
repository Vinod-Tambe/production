const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const accountSchema = new mongoose.Schema({
  acc_add_date: {
    type: Date,
    default: Date.now,
  },
  acc_own_id: {
    type: Number,
    required: true,
  },
  acc_firm_id: {
    type: Number,
    required: true,
  },
  acc_pan_no: {
    type: String,
    required: true,
    uppercase: true,
    match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // PAN format
  },
  acc_name: {
    type: String,
    required: true,
    trim: true,
  },
  acc_desc: String,
  acc_pre_acc: String,
  acc_bank_no: {
    type: String,
    required: true,
  },
  acc_bsr_no: String,
  acc_ifsc_code: {
    type: String,
    match: /^[A-Z]{4}0[A-Z0-9]{6}$/, // IFSC format
  },
  acc_branch_name: String,
  acc_opening_date: Date,
  acc_address: String,
  acc_country: String,
  acc_state: String,
  acc_city: String,
  acc_pincode: {
    type: String,
    match: /^[0-9]{6}$/,
  },
  acc_cash_balance: {
    type: Number,
    default: 0,
  },
  acc_balance_type: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },
  acc_other_info: String,
});

accountSchema.plugin(AutoIncrement, { inc_field: "acc_id" });

module.exports = mongoose.model("Account", accountSchema);
