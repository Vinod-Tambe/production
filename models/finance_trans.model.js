const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const financeTransactionSchema = new mongoose.Schema({
  ft_firm_id: {
    type: Number,
    required: true,
  },
  ft_own_id: {
    type: Number,
    required: true,
  },
  ft_user_id: {
    type: Number,
    required: true,
  },
  ft_fin_id: {
    type: Number,
    required: true,
  },
  ft_emi_no: {
    type: Number,
    required: true,
  },
  ft_add_date: {
    type: String,
    default: () => {
      const now = new Date();
      return now.toISOString().slice(0, 10).split("-").reverse().join("-");
    },
  },
  ft_start_date: {
    type: String,
    default: () => {
      const now = new Date();
      return now.toISOString().slice(0, 10).split("-").reverse().join("-");
    },
  },
  ft_due_date: {
    type: String,
    default: () => {
      const now = new Date();
      return now.toISOString().slice(0, 10).split("-").reverse().join("-");
    },
  },
  ft_paid_date: {
    type: String,
  },
  ft_emi_amt: {
    type: Number,
    required: true,
  },
  ft_fine_amt: {
    type: Number,
    default: 0,
  },
  ft_paid_amt: {
    type: Number,
    required: true,
  },
  ft_pending_amt: {
    type: Number,
    required: true,
  },
  ft_emi_status: {
    type: String,
    enum: ["Paid", "Pending", "Due"],
    default: "Pending",
  },
}, {
  timestamps: true,
});

financeTransactionSchema.plugin(AutoIncrement, { inc_field: 'ft_id' });

module.exports = mongoose.model("Finance_Trans", financeTransactionSchema);
