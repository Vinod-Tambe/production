const Account = require("../models/account.model");
const Firm = require("../models/firm.model");

exports.createAccount = async (data) => {
  const duplicate = await Account.findOne({
    acc_firm_id: data.acc_firm_id,
    acc_name: data.acc_name.trim(),
  });

  if (duplicate) {
    throw new Error("Account name already exists for this firm");
  }

  return await Account.create(data);
};

exports.updateAccount = async (id, updateData) => {
  const existing = await Account.findOne({
    acc_firm_id: updateData.acc_firm_id,
    acc_name: updateData.acc_name.trim(),
    acc_id: { $ne: id } // exclude the current record
  });

  if (existing) {
    throw new Error("Another account with the same name exists for this firm");
  }

  return await Account.findOneAndUpdate(
    { acc_id: id },
    updateData,
    { new: true }
  );
};

exports.getAllAccounts = async () => {
  return await Account.find();
};

exports.getAccountById = async (id) => {
  return await Account.findOne({ acc_id: id });
};


exports.deleteAccount = async (id) => {
  return await Account.findOneAndDelete({ acc_id: id });
};
