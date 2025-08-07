const Finance_Transaction = require("../models/finance_transaction.model");

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
  const created = await Finance_Transaction.insertMany(transactions);
  return created;
};

const get_Finance_Transaction_EMI = async (firm_id, user_id, fin_id) => {
  return await Finance_Transaction.find({
    ft_firm_id: firm_id,
    ft_user_id: user_id,
    ft_fin_id: fin_id
  });
};

const update_finance_transaction = async (firm_id, user_id, fin_id, trans_amt) => {
  const all_finance_EMI = await get_Finance_Transaction_EMI(firm_id, user_id, fin_id);

  let remainingAmount = trans_amt;
  for (const emi of all_finance_EMI) {
    if (remainingAmount <= 0) break;

    let paidAmt = emi.ft_paid_amt || 0;
    let emiAmt = emi.ft_emi_amt || 0;
    let PendingAmt = emi.ft_pending_amt || 0;
    let newStatus = 'DUE';
    if (emiAmt <= remainingAmount) {
      paidAmt = emiAmt;
      PendingAmt = 0;
      newStatus = 'PAID';
      remainingAmount = remainingAmount - paidAmt;
    } else {
      paidAmt = remainingAmount;
      PendingAmt = emiAmt - remainingAmount;
      remainingAmount = remainingAmount - paidAmt;
      newStatus = 'PARTIAL';
    }
    // ✅ Always update, regardless of partial/full
    const updatedData = await Finance_Transaction.findOneAndUpdate(
      { _id: emi._id },
      {
        ft_paid_amt: paidAmt,
        ft_pending_amt: PendingAmt,
        ft_emi_status: newStatus,
      },
      { new: true }
    );
  }

  return { message: 'Update complete' };
};




const delete_finance_transaction = async (id) => {
  return await Finance_Transaction.findOneAndDelete({ ft_id: id });
};

module.exports = {
  create_finance_transaction,
  get_Finance_Transaction_EMI,
  update_finance_transaction,
  delete_finance_transaction,
};
