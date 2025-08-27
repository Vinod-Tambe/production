const accountService = require("../services/account.service");
const { get_account_ledger_details } = require("../services/account_ledger.service");
const { getOwnerIdFromToken } = require("../utils/tokenHelper");
const { createAccountSchema } = require("../validation/account.validation");

exports.createAccount = async (req, res) => {
  try {
    const ownerId = await getOwnerIdFromToken(req);
    req.body.acc_own_id = ownerId;
    await createAccountSchema.validateAsync(req.body);
    const account = await accountService.create_account(req.body);
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
    const accounts = await accountService.get_all_account();
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
    const account = await accountService.get_account_by_id(req.params.id);
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
      const ownerId = await getOwnerIdFromToken(req);
    req.body.acc_own_id = ownerId;
    const account = await accountService.update_account(req.params.id, req.body);
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
    const account = await accountService.delete_account(req.params.id);
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
exports.get_account_ledger = async (req, res) => {
  try {
      const { firmId, startDate, endDate,acc_id } = req.query;
  
      // Validate date format (YYYY-MM-DD) if provided
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (startDate && !dateRegex.test(startDate)) {
        return res.status(400).json({
          success: false,
          message: "Invalid start date format. Use YYYY-MM-DD",
        });
      }
      if (endDate && !dateRegex.test(endDate)) {
        return res.status(400).json({
          success: false,
          message: "Invalid end date format. Use YYYY-MM-DD",
        });
      }
  
      // Validate date range logic if both dates are provided
      if (startDate && endDate) {
        const start = new Date(startDate + "T00:00:00.000Z");
        const end = new Date(endDate + "T00:00:00.000Z");
        if (isNaN(start) || isNaN(end)) {
          return res.status(400).json({
            success: false,
            message: "Invalid date values",
          });
        }
        if (start > end) {
          return res.status(400).json({
            success: false,
            message: "Start date cannot be after end date",
          });
        }
      }
  
      // Prepare filters object (only include provided parameters)
      const filters = {};
      if (firmId) filters.firmId = firmId;
      if (acc_id) filters.acc_id = acc_id;
      if (startDate) filters.startDate = startDate;
      if (endDate) filters.endDate = endDate;
  
      const response = await get_account_ledger_details(filters);
  
      return res.status(200).json({
        success: true,
        message: "ledger entries fetched successfully",
        data: response,
      });
    } catch (error) {
      console.error("Error fetching ledger entries:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch ledger entries",
        error: error.message,
      });
    }
};
