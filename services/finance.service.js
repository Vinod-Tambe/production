const Finance = require('../models/finance.modal');

async function createFinance(data) {
  const finance = new Finance(data);
  return await finance.save();
}

async function updateFinance(fin_id, updates) {
  const finance = await Finance.findOneAndUpdate({ fin_id }, updates, {
    new: true,
  });
  if (!finance) throw new Error('Finance record not found');
  return finance;
}

async function deleteFinance(fin_id) {
  const result = await Finance.deleteOne({ fin_id });
  if (result.deletedCount !== 1) throw new Error('Finance record not found');
  return;
}

async function getFinanceDetails(fin_id) {
  const finance = await Finance.findOne({ fin_id });
  if (!finance) throw new Error('Finance record not found');
  return finance;
}

async function getAllFinance(filter = {}) {
  return await Finance.find(filter).sort({ createdAt: -1 });
}

module.exports = {
  createFinance,
  updateFinance,
  deleteFinance,
  getFinanceDetails,
  getAllFinance,
};
