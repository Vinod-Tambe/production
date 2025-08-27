const Account = require("../models/account.model");
const Firm = require("../models/firm.model");
// Helper function to check for duplicate accounts
const check_duplicate_account = async (accounts, excludeId = null) => {
  const firmNamePairs = accounts.map(data => ({
    acc_firm_id: data.acc_firm_id,
    acc_name: data.acc_name.trim(),
  }));

  const query = excludeId
    ? { $or: firmNamePairs, acc_id: { $ne: excludeId } }
    : { $or: firmNamePairs };

  const duplicates = await Account.find(query).select('acc_firm_id acc_name');
  if (duplicates.length > 0) {
    const duplicateNames = duplicates.map(d => `${d.acc_name} (firm ID: ${d.acc_firm_id})`).join(', ');
    throw new Error(`Account names already exist: ${duplicateNames}`);
  }
};

exports.create_account = async (data) => {
  await check_duplicate_account([data]);
  return await Account.create(data);
};

exports.create_multiple_account = async (accounts) => {
  if (!Array.isArray(accounts) || accounts.length === 0) {
    throw new Error("Input must be a non-empty array of account data");
  }

  const savedAccounts = [];

  for (const accountData of accounts) {
    const account = new Account(accountData);
    const savedAccount = await account.save(); // This triggers the auto-increment plugin
    savedAccounts.push(savedAccount);
  }

  return savedAccounts;
};

exports.update_account = async (id, updateData) => {
  await check_duplicate_account([{ acc_firm_id: updateData.acc_firm_id, acc_name: updateData.acc_name.trim() }], id);
  return await Account.findOneAndUpdate(
    { acc_id: id },
    updateData,
    { new: true }
  );
};
exports.get_acc_opening_balance = async (firmId='N', startDate,accId="N") => {
  try {
    const query = {
      acc_cash_balance: { $ne: 0 },
      acc_opening_date: { $lte: startDate },
    };
    if (firmId !== 'N') {
      query.acc_firm_id = firmId;
    }
    if (accId !== 'N') {
      query.acc_id = accId;
    }
    const accounts = await Account.find(query).select('acc_cash_balance acc_name acc_firm_id acc_balance_type acc_id acc_pre_acc');
    return accounts;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
}

exports.get_all_account = async () => {
  return await Account.find();
};

exports.get_account_by_id = async (id) => {
  return await Account.findOne({ acc_id: id });
};

exports.delete_account = async (id) => {
  return await Account.findOneAndDelete({ acc_id: id });
};