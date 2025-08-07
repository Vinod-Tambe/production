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
 console.log(transactions);
  const created = await Finance_Transaction.insertMany(transactions);
  return created;
};


const get_all_finance_transactions = async () => {
  return await Finance_Transaction.find().sort({ createdAt: -1 });
};

const get_finance_transaction_by_id = async (id) => {
  return await Finance_Transaction.findOne({ ft_id: id });
};


const update_finance_transaction = async (id, updateData) => {
  return await Finance_Transaction.findOneAndUpdate(
    { ft_id: id },
    updateData,
    { new: true }
  );
};


const delete_finance_transaction = async (id) => {
  return await Finance_Transaction.findOneAndDelete({ ft_id: id });
};

module.exports = {
  create_finance_transaction,
  get_all_finance_transactions,
  get_finance_transaction_by_id,
  update_finance_transaction,
  delete_finance_transaction,
};
