const mongoose = require('mongoose');

const FinanceMoneyTansSchema = new mongoose.Schema({
  fm_firm_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Firm', required: true },
  fm_own_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  fm_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fm_fin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Finance', required: true },

  fm_type: { type: String, required: true },

  fm_total_amt: { type: Number, required: true },

  fm_cash_amt: { type: Number, default: 0 },
  fm_bank_amt: { type: Number, default: 0 },
  fm_online_amt: { type: Number, default: 0 },
  fm_card_amt: { type: Number, default: 0 },

  fm_cash_acc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  fm_bank_acc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  fm_online_acc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  fm_card_acc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },

  fm_cash_info: { type: String },
  fm_bank_info: { type: String },
  fm_online_info: { type: String },
  fm_card_info: { type: String },

  fm_dr_acc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ledger' },
  fm_crdr: { type: String, enum: ['Dr', 'Cr'] },

}, { timestamps: true });

module.exports = mongoose.model('Finance_Money_Trans', FinanceMoneyTansSchema);
