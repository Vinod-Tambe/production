const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const financeSchema = new mongoose.Schema({
  fin_add_date: {
    type: String,
   default: () => {
      const now = new Date();
      return now.toISOString().slice(0, 10).split('-').reverse().join('-');
    }
  },
  fin_own_id: {
    type: Number,
    required: true,
    default: 0,
  },
  fin_firm_id: {
    type: Number,
    required: true,
    default: 0,
  },
  fin_user_id: {
    type: Number,
    required: true,
    default: 0,
  },
  fin_jrnl_id: {
    type: Number,
    default: 0,
  },
  fin_staff_id: {
    type: Number,
    required: true,
    default: 0,
  },
  fin_prin_amt: {
    type: Number,
    required: true,
    trim: true,
    default: "",
  },
  fin_no_of_emi: {
    type: Number,
    required: true,
    trim: true,
    default: "",
  },
  fin_start_date: {
    type: String,
    required: true,
    default: () => {
      const now = new Date();
      return now.toISOString().slice(0, 10).split('-').reverse().join('-'); // "DD-MM-YYYY"
    }
  },
  fin_time_period: {
    type: String,
    trim: true,
    default: "",
  },
  fin_sms_period: {
    type: String,
    trim: true,
    default: "",
  },
  fin_freq: {
    type: String,
    required: true,
    trim: true,
    default: "",
  },
  fin_freq_type: {
    type: String,
    required: true,
    trim: true,
    default: "",
  },
  fin_roi: {
    type: String,
    trim: true,
    default: "",
  },
  fin_collec_amt: {
    type: Number,
    trim: true,
    default: "",
  },
  fin_proccess_amt: {
    type: Number,
    trim: true,
    default: "",
  },
  fin_fine_amt: {
    type: Number,
    trim: true,
    default: "",
  },
  fin_fine_emi_no: {
    type: Number,
    trim: true,
    default: "",
  },
  fin_emi_amt: {
    type: Number,
    trim: true,
    default: "",
  },
  fin_final_amt: {
    type: Number,
    required: true,
    trim: true,
    default: "",
  },
  fin_cash_amt: {
    type: String,
    trim: true,
    default: "",
  },
  fin_bank_amt: {
    type: String,
    trim: true,
    default: "",
  },
  fin_online_amt: {
    type: String,
    trim: true,
    default: "",
  },
  fin_card_amt: {
    type: String,
    trim: true,
    default: "",
  },
   fin_cash_acc_id: {
    type: Number,
    required: true,
    trim: true,
    default: "",
  },
  fin_bank_acc_id: {
    type: Number,
    required: true,
    trim: true,
    default: "",
  },
  fin_online_acc_id: {
    type: Number,
    required: true,
    trim: true,
    default: "",
  },
  fin_card_acc_id: {
    type: Number,
    required: true,
    trim: true,
    default: "",
  },
   fin_cash_info: {
    type: String,
    trim: true,
    default: "",
  },
  fin_bank_info: {
    type: String,
    trim: true,
    default: "",
  },
  fin_online_info: {
    type: String,
    trim: true,
    default: "",
  },
  fin_card_info: {
    type: String,
    trim: true,
    default: "",
  },
  fin_dr_acc_id:{
    type: Number,
    required: true,
    trim: true,
    default: "",
  },
  fin_pay_info:{
     type: String,
    trim: true,
    default: "",
  },
  fin_other_info:{
    type: String,
    trim: true,
    default: "",
  },
}, {
  timestamps: true,
});

financeSchema.plugin(AutoIncrement, { inc_field: 'fin_id' });

module.exports = mongoose.model("Finance", financeSchema);