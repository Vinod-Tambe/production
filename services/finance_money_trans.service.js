const Finance_Money_Transaction = require("../models/finance_money_trans.model");
const { delete_journal_entry } = require("./journal.service");

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
  // Step 1: Find the documents to delete
  const entries = await Finance_Money_Transaction.find({ fm_fin_id: id });

  if (!entries || entries.length === 0) {
    console.log('No finance money entries found to delete.');
    return { deletedCount: 0 };
  }

  // Step 2: Delete the documents
  const result = await Finance_Money_Transaction.deleteMany({ fm_fin_id: id });

  // Step 3: Call delete_journal_entry for each deleted entry
  for (const entry of entries) {
    await delete_journal_entry(entry.fm_jrnl_id, entry.fm_own_id, entry.fm_firm_id);
  }

  // Step 4: Optionally return deleted data or summary
  return {
    deletedCount: result.deletedCount,
    deletedEntries: entries
  };
};


module.exports = {
  create_finance_money_entry,
  get_finance_money_entries,
  delete_finance_money_entries
};
