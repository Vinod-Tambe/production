const Journal = require('../models/journal.model');
const { create_journal_trans_entry, delete_journal_trans_entry } = require('./journal_trans.service');

/*
 * Create a new journal entry.
 */
const create_journal_entry = async (data) => {
  try {
    const newJournal = new Journal(data.journal_date); // Pass the entire object
    const saved = await newJournal.save();
    const journal_trans_data = await make_journal_request(data,saved.jrnl_id);
    await create_journal_trans_entry(journal_trans_data)
    return saved.jrnl_id;
  } catch (err) {
    console.error('Validation errors:', err.errors || err.message); // Log detailed errors
    throw new Error(`Failed to create journal entry: ${err.message}`);
  }
};

/*
 * Delete a journal entry by jrnl_id, jrnl_own_id, and jrnl_firm_id.
 */
const delete_journal_entry = async (jrnl_id, jrnl_own_id, jrnl_firm_id) => {
  try {
    const deleted = await Journal.findOneAndDelete({ jrnl_id, jrnl_own_id, jrnl_firm_id });
    if (!deleted) {
      throw new Error('Journal entry not found');
    }
     const deleted_journal_trans = await delete_journal_trans_entry(jrnl_id, jrnl_own_id, jrnl_firm_id);
      if (!deleted_journal_trans) {
      throw new Error('Journal entry not found');
    }
    return deleted;
  } catch (err) {
    throw new Error(`Failed to delete journal entry: ${err.message}`);
  }
};

/*
 * Prepare journal data by merging shared fields into transactions.
 */
const make_journal_request = async (inputData,jrnl_id) => {
  try {
    // Access journal data
    const {
      jrnl_date,
      jrnl_firm_id,
      jrnl_own_id,
      jrnl_user_id,
      jrnl_panel,
      jrnl_other_info
    } = inputData.journal_date;

    // Validate required fields
    if (!jrnl_date || !jrnl_firm_id || !jrnl_own_id || !jrnl_panel) {
      throw new Error(
        `Missing required fields: ${[
          !jrnl_date && 'jrnl_date',
          !jrnl_firm_id && 'jrnl_firm_id',
          !jrnl_own_id && 'jrnl_own_id',
          !jrnl_panel && 'jrnl_panel'
        ].filter(Boolean).join(', ')}`
      );
    }

    // Process transactions in a single loop
    const transactions = inputData.joural_trans_data || [];
    const updatedTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
      const tx = transactions[i];
      if (!tx.jrtr_crdr || !['CR', 'DR'].includes(tx.jrtr_crdr)) continue;

      const isCR = tx.jrtr_crdr === 'CR';
      const isValid = isCR
        ? tx.jrtr_cr_acc_id && tx.jrtr_cr_amt && tx.jrtr_cr_amt !== '0'
        : tx.jrtr_dr_acc_id && tx.jrtr_dr_amt && tx.jrtr_dr_amt !== '0';

      if (!isValid) continue;

      updatedTransactions.push({
        jrtr_date: jrnl_date,
        jrtr_firm_id: jrnl_firm_id,
        jrtr_own_id: jrnl_own_id,
        jrtr_jrnl_id: jrnl_id,
        jrtr_user_id: jrnl_user_id,
        jrtr_panel: jrnl_panel,
        jrtr_other_info: jrnl_other_info,
        jrtr_crdr: tx.jrtr_crdr,
        jrtr_cr_acc_id: isCR ? tx.jrtr_cr_acc_id : '',
        jrtr_cr_amt: isCR ? tx.jrtr_cr_amt : 0,
        jrtr_dr_acc_id: isCR ? '' : tx.jrtr_dr_acc_id,
        jrtr_dr_amt: isCR ? 0 : tx.jrtr_dr_amt,
        jrtr_acc_info: tx.jrtr_acc_info || ''
      });
    }

    // Return required fields for the Journal model
    return  updatedTransactions;
  } catch (err) {
    throw new Error(`Failed to process journal request: ${err.message}`);
  }
};

module.exports = {
  create_journal_entry,
  delete_journal_entry,
  make_journal_request
};