const Finance_Trans = require("../models/finance_trans.model");
const { create_finance_money_entry } = require("./finance_money_trans.service");

const create_finance_transaction = async (data, count = 1) => {
  if (count < 1) count = 1;

  const transactions = [];

  for (let i = 1; i <= count; i++) {
    const transaction = {
      ...data,
      ft_emi_no: i
    };
    transactions.push(transaction);
  }
  const created = await Finance_Trans.insertMany(transactions);
  return created;
};

const get_Finance_Transaction_EMI = async (firm_id, user_id, fin_id) => {
  return await Finance_Trans.find({
    ft_firm_id: firm_id,
    ft_user_id: user_id,
    ft_fin_id: fin_id
  }).sort({ ft_emi_no: 1 });
};


const update_finance_transaction = async (transData) => {
  try {
    const { fm_firm_id, fm_user_id, fm_fin_id, fm_trans_amt, fm_trans_type } = transData;

    const all_finance_EMI = await get_Finance_Transaction_EMI(fm_firm_id, fm_user_id, fm_fin_id);
    if (!all_finance_EMI || all_finance_EMI.length === 0) {
      return { success: false, message: "No EMI records found." };
    }

    let total_paid_amt = await get_total_paid_amount(all_finance_EMI);
    let remainingAmount = fm_trans_type === "PAID"
      ? total_paid_amt + fm_trans_amt
      : total_paid_amt - fm_trans_amt;

    const updatedEMIs = [];

    for (const emi of all_finance_EMI) {
      let paidAmt = emi.ft_paid_amt || 0;
      const emiAmt = emi.ft_emi_amt || 0;
      let pendingAmt = emi.ft_pending_amt || emiAmt;
      let newStatus = 'DUE';

      if (remainingAmount <= 0) {
        paidAmt = 0;
        pendingAmt = emiAmt;
        newStatus = 'DUE';
      } else {
        if (emiAmt <= remainingAmount) {
          paidAmt = emiAmt;
          pendingAmt = 0;
          newStatus = 'PAID';
          remainingAmount -= paidAmt;
        } else {
          paidAmt = remainingAmount;
          pendingAmt = emiAmt - remainingAmount;
          remainingAmount = 0;
          newStatus = 'PARTIAL';
        }
      }

      const updatedEmi = await Finance_Trans.findOneAndUpdate(
        { _id: emi._id },
        {
          ft_paid_amt: paidAmt,
          ft_pending_amt: pendingAmt,
          ft_emi_status: newStatus,
        },
        { new: true }
      );

      if (updatedEmi) {
        updatedEMIs.push(updatedEmi);
      }
    }

    let moneyEntry = null;

    if (updatedEMIs.length > 0) {
      // Only create money transaction if EMI update occurred
      moneyEntry = await create_finance_money_entry(transData);
    }

    return {
      success: true,
      message: 'EMI payment processed successfully.',
      updatedEmis: updatedEMIs,
      moneyTransaction: moneyEntry
    };
  } catch (error) {
    console.error("Service Error (update_finance_transaction):", error.message);
    return {
      success: false,
      message: 'Failed to process EMI payment.',
      error: error.message
    };
  }
};

const delete_finance_transaction = async (id) => {
  return await Finance_Trans.findOneAndDelete({ ft_id: id });
};

//get all emi paid amount
const get_total_paid_amount = async (all_finance_EMI) => {
  let totalPaid = 0;

  for (const emi of all_finance_EMI) {
    const paidAmt = emi.ft_paid_amt || 0;
    totalPaid += paidAmt;
  }

  return totalPaid;
}

module.exports = {
  create_finance_transaction,
  get_Finance_Transaction_EMI,
  update_finance_transaction,
  delete_finance_transaction,
  get_total_paid_amount
};
