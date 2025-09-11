const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const financeMoneyTransactionSchema = new mongoose.Schema({
  fm_firm_id: {
    type: Number,
    required: true,
  },
  fm_own_id: {
    type: Number,
    required: true,
  },
  fm_user_id: {
    type: Number,
    required: true,
  },
  fm_fin_id: {
    type: Number,
    required: true,
  },
   fm_jrnl_id: {
    type: Number,
    default: 0,
  },
  fm_add_date: {
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
  fm_trans_crdr: {
    type: String,
    trim: true,
    default: "",
  },
  fm_trans_date: {
    type: String,
   required:true,
  },
  fm_trans_panel: {
    type: String,
    trim: true,
    default: "",
  },
  fm_trans_type: {
    type: String,
    trim: true,
    default: "",
  },
  fm_trans_amt: {
    type: Number,
    required: true,
  },
  fm_cash_amt: {
    type: Number,
    required: true,
    trim: true,
    default: "0",
  },
  fm_bank_amt: {
    type: Number,
    required: true,
    trim: true,
    default: "0",
  },
  fm_online_amt: {
    type: Number,
    required: true,
    trim: true,
    default: "0",
  },
  fm_card_amt: {
    type: Number,
    required: true,
    trim: true,
    default: "0",
  },
  fm_cash_acc_id: {
    type: Number,
    required: true,
    trim: true,
    default: "",
  },
  fm_bank_acc_id: {
    type: Number,
    required: true,
    trim: true,
    default: "",
  },
  fm_online_acc_id: {
    type: Number,
    required: true,
    trim: true,
    default: "",
  },
  fm_card_acc_id: {
    type: Number,
    required: true,
    trim: true,
    default: "",
  },
  fm_cash_info: {
    type: String,
    trim: true,
    default: "",
  },
  fm_bank_info: {
    type: String,
    trim: true,
    default: "",
  },
  fm_online_info: {
    type: String,
    trim: true,
    default: "",
  },
  fm_card_info: {
    type: String,
    trim: true,
    default: "",
  },
  fm_dr_acc_id: {
    type: String,
    required: true,
    trim: true,
    default: "",
  },
  fm_pay_info: {
    type: String,
    trim: true,
    default: "",
  },
  fm_other_info: {
    type: String,
    trim: true,
    default: "",
  },
}, {
  timestamps: true,
});

financeMoneyTransactionSchema.plugin(AutoIncrement, { inc_field: 'fm_id' });

module.exports = mongoose.model("Finance_Money_Trans", financeMoneyTransactionSchema);
