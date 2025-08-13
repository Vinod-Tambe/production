const accountService = require("../services/account.service");
const { getOwnerIdFromToken } = require("../utils/tokenHelper");
const { createAccountSchema } = require("../validation/account.validation");

exports.createAccount = async (req, res) => {
  try {
    const ownerId = await getOwnerIdFromToken(req);
    req.body.acc_own_id = ownerId;
    await createAccountSchema.validateAsync(req.body);
    const account = await accountService.createAccount(req.body);
    res.status(200).json({
      success: true,
      message: "Account created successfully",
      data: account,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Failed to create account",
      error: err.message,
    });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await accountService.getAllAccounts();
    res.status(200).json({
      success: true,
      message: "Accounts retrieved successfully",
      data: accounts,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Failed to retrieve accounts",
      error: err.message,
    });
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const account = await accountService.getAccountById(req.params.id);
    if (!account) {
      return res.status(200).json({
        success: false,
        message: "Account not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Account retrieved successfully",
      data: account,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Failed to retrieve account",
      error: err.message,
    });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    await createAccountSchema.validateAsync(req.body);
    const account = await accountService.updateAccount(req.params.id, req.body);
    if (!account) {
      return res.status(200).json({
        success: false,
        message: "Account not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Account updated successfully",
      data: account,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Failed to update account",
      error: err.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const account = await accountService.deleteAccount(req.params.id);
    if (!account) {
      return res.status(200).json({
        success: false,
        message: "Account not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Failed to delete account",
      error: err.message,
    });
  }
};
