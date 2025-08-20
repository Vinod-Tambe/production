const Finance = require('../models/finance.modal');
const { delete_finance_money_entries } = require('./finance_money_trans.service');
const Finance_Transaction = require('./finance_transaction.service');
const { create_journal_entry } = require('./journal.service');
async function create_finance(data) {
  try {
    // Create and save the finance entry
    const finance = new Finance(data);
    const result = await finance.save();
    if (result) {
      const finance_trans_data = {
        ft_firm_id: result.fin_firm_id,
        ft_own_id: result.fin_own_id,
        ft_user_id: result.fin_user_id,
        ft_fin_id: result.fin_id,
        ft_add_date: result.fin_start_date,
        ft_emi_amt: result.fin_emi_amt,
        ft_paid_amt: 0,
        ft_pending_amt: result.fin_emi_amt,
        ft_emi_status: 'Due'
      };
      const response = await Finance_Transaction.create_finance_transaction(finance_trans_data, result.fin_no_of_emi, result.fin_freq, result.fin_freq_type, result.fin_start_date);
    }
    //make a jornal entry
    const jornal_request = {
      "journal_date": {
        "jrnl_date": result.fin_start_date, "jrnl_firm_id": result.fin_firm_id, "jrnl_own_id": result.fin_own_id,
        "jrnl_user_id": result.fin_user_id, "jrnl_amt": result.fin_final_amt, "jrnl_panel": "Finance", "jrnl_other_info": `Add New Finance : Fin No - ${result.fin_id}`
      },
      "joural_trans_data": [
        { "jrtr_crdr": "CR", "jrtr_cr_acc_id": result.fin_cash_acc_id, "jrtr_cr_amt": result.fin_cash_amt, "jrtr_acc_info": result.fin_cash_info },
        { "jrtr_crdr": "CR", "jrtr_cr_acc_id": result.fin_bank_acc_id, "jrtr_cr_amt": result.fin_bank_amt, "jrtr_acc_info": result.fin_bank_info },
        { "jrtr_crdr": "CR", "jrtr_cr_acc_id": result.fin_online_acc_id, "jrtr_cr_amt": result.fin_online_amt, "jrtr_acc_info": result.fin_online_info },
        { "jrtr_crdr": "CR", "jrtr_cr_acc_id": result.fin_card_acc_id, "jrtr_cr_amt": result.fin_card_amt, "jrtr_acc_info": result.fin_card_info },
        { "jrtr_crdr": "DR", "jrtr_dr_acc_id": result.fin_dr_acc_id, "jrtr_dr_amt": result.fin_final_amt, "jrtr_acc_info": `Add New Finance : Fin No - ${result.fin_id}` }
      ]
    }
    const jrnl_id = await create_journal_entry(jornal_request);
    //make a jornal entry
    const updatedFinance = await Finance.findOneAndUpdate(
      { _id: result._id },
      { $set: { fin_jrnl_id: jrnl_id } },
      { new: true } // Return the updated document
    );
    return updatedFinance;
  } catch (error) {
    console.error('Error creating finance:', error);
    throw error;
  }

}

async function update_finance(id, data) {
  const finance = await Finance.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!finance) throw new Error('Finance record not found');
  return finance;
}

async function delete_finance(id) {
  const result = await Finance.findOneAndDelete({ fin_id: id });
  await Finance_Transaction.delete_finance_transaction(id);
  await delete_finance_money_entries(id);
  return result;
}

async function get_finance_details(id) {
  const finance = await Finance.findById(id);
  return finance;
}

async function get_all_finance(filter = {}) {
  return await Finance.find(filter).sort({ createdAt: -1 });
}

module.exports = {
  create_finance,
  update_finance,
  delete_finance,
  get_finance_details,
  get_all_finance,
};
