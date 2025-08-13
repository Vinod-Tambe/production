const Finance = require('../models/finance.modal');
const Finance_Transaction = require('./finance_transaction.service');

async function create_finance(data) {
  try {
    // Create and save the finance entry
    const finance = new Finance(data);
    const result = await finance.save();
    const fin_freq=result.fin_freq;
    const fin_freq_type=result.fin_freq_type;
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
     const response= await Finance_Transaction.create_finance_transaction(finance_trans_data, result.fin_no_of_emi,result.fin_freq,result.fin_freq_type,result.fin_start_date);
    }

    return result;
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
  const result = await Finance.findByIdAndDelete(id);
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
