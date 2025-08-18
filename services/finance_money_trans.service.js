const Finance_Money_Transaction = require("../models/finance_money_trans.model");

// CREATE
const create_finance_money_entry = async (transData) => {
  try {
    const newTransaction = new Finance_Money_Transaction(transData);
    return await newTransaction.save();
  } catch (error) {
    console.error("Service Error (create):", error.message);
    throw error;
  }
};

// GET (ALL or FILTERED)
const get_finance_money_entries = async (filter = {}) => {
  try {
    return await Finance_Money_Transaction.find(filter).sort({ createdAt: -1 }); // latest first
  } catch (error) {
    console.error("Service Error (get):", error.message);
    throw error;
  }
};

const delete_finance_money_entries = async (id) => {
  return await Finance_Money_Transaction.deleteMany({ fm_fin_id: id });
};

module.exports = {
  create_finance_money_entry,
  get_finance_money_entries,
  delete_finance_money_entries
};
