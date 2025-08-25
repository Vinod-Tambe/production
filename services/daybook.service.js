const mongoose = require("mongoose");
const Finance = require("../models/finance.modal");
const Finance_Money_Transaction = require("../models/finance_money_trans.model");

// Reusable function to format date as DD-MM-YYYY
const formatDateToDDMMYYYY = (date) => {
  if (!date) return "";
  let d;
  if (typeof date === "string" && date.match(/^\d{2}-\d{2}-\d{4}$/)) {
    // Handle string date (e.g., "24-08-2025")
    const [day, month, year] = date.split("-");
    d = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
  } else {
    d = new Date(date);
  }
  if (isNaN(d)) return "";
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const year = d.getUTCFullYear();
  return `${day}-${month}-${year}`;
};

// Reusable function to map database records to response format
const mapToResponse = (item) => {
  // Convert amount fields to numbers, default to 0 if invalid
  const toNumber = (value) => (parseFloat(value) || 0).toFixed(2);

  return {
    db_date: formatDateToDDMMYYYY(item.fin_add_date || item.fm_trans_date),
    db_firm: item.fin_firm_id || item.fm_firm_id || "",
    db_customer_name: item.fin_user_id || item.fm_user_id || "",
    db_cust_id: `C${item.fin_user_id || item.fm_user_id || ""}`,
    db_cash_amt: toNumber(item.fin_cash_amt || item.fm_cash_amt),
    db_bank_amt: toNumber(item.fin_bank_amt || item.fm_bank_amt),
    db_online_amt: toNumber(item.fin_online_amt || item.fm_online_amt),
    db_card_amt: toNumber(item.fin_card_amt || item.fm_card_amt),
    db_disc_amt: (0).toFixed(2),
  };
};

// Centralized error handler
const handleError = (error, title, colorClass, amtColor) => {
  console.error(`Error fetching ${title} data:`, error);
  return {
    title,
    colorClass,
    amtColor,
    column: ["DATE", "FIRM", "CUSTOMER NAME", "CUST ID", "CASH", "BANK", "ONLINE", "CARD", "DISC"],
    data: [],
    error: error.message,
  };
};

// Convert DD-MM-YYYY to string for string-based date queries
const toDateString = (dateStr) => {
  if (!dateStr || !dateStr.match(/^\d{2}-\d{2}-\d{4}$/)) {
    throw new Error(`Invalid date format: ${dateStr}. Expected DD-MM-YYYY`);
  }
  return dateStr; // Return as-is for string comparison
};

// Fetch finance added data with filters
const get_add_new_finance_data = async (filters = {}) => {
  try {

    const query = {};
    if (filters.firmId) {
      // Try both number and string for firmId
      const firmId = isNaN(filters.firmId) ? filters.firmId.toString() : Number(filters.firmId);
      query.fin_firm_id = mongoose.isValidObjectId(filters.firmId)
        ? mongoose.Types.ObjectId(filters.firmId)
        : { $in: [firmId, filters.firmId.toString()] }; // Match number or string
    }

    if (filters.startDate || filters.endDate) {
      query.fin_add_date = {};
      if (filters.startDate) {
        query.fin_add_date.$gte = toDateString(filters.startDate);
      }
      if (filters.endDate) {
        query.fin_add_date.$lte = toDateString(filters.endDate);
      }
    }


    const financeRecords = await Finance.find(query)
      .select("fin_add_date fin_firm_id fin_user_id fin_cash_amt fin_bank_amt fin_online_amt fin_card_amt")
      .lean()
      .limit(1000);

    return {
      title: "FINANCE ADDED",
      colorClass: "bg-green",
      amtColor: "text-danger",
      column: ["DATE", "FIRM", "CUSTOMER NAME", "CUST ID", "CASH", "BANK", "ONLINE", "CARD", "DISC"],
      data: financeRecords.map(mapToResponse),
    };
  } catch (error) {
    return handleError(error, "FINANCE ADDED", "bg-green", "text-danger");
  }
};

// Fetch finance paid EMI data with filters
const get_finance_paid_emi_data = async (filters = {}) => {
  try {

    const query = { fm_trans_type: "PAID" };
    if (filters.firmId) {
      const firmId = isNaN(filters.firmId) ? filters.firmId.toString() : Number(filters.firmId);
      query.fm_firm_id = mongoose.isValidObjectId(filters.firmId)
        ? mongoose.Types.ObjectId(filters.firmId)
        : { $in: [firmId, filters.firmId.toString()] };
    }

    if (filters.startDate || filters.endDate) {
      query.fm_trans_date = {};
      if (filters.startDate) {
        query.fm_trans_date.$gte = toDateString(filters.startDate);
      }
      if (filters.endDate) {
        query.fm_trans_date.$lte = toDateString(filters.endDate);
      }
    }


    const paidRecords = await Finance_Money_Transaction.find(query)
      .select("fm_trans_date fm_firm_id fm_user_id fm_trans_amt fm_cash_amt fm_bank_amt fm_online_amt fm_card_amt")
      .lean()
      .limit(1000);

    return {
      title: "FINANCE EMI DEPOSIT",
      colorClass: "bg-red",
      amtColor: "text-success",
      column: ["DATE", "FIRM", "CUSTOMER NAME", "CUST ID", "CASH", "BANK", "ONLINE", "CARD", "DISC"],
      data: paidRecords.map(mapToResponse),
    };
  } catch (error) {
    return handleError(error, "FINANCE EMI DEPOSIT", "bg-red", "text-success");
  }
};

// Fetch finance rollback EMI data with filters
const get_finance_rollback_emi_data = async (filters = {}) => {
  try {

    const query = { fm_trans_type: "ROLLBACK" };
    if (filters.firmId) {
      const firmId = isNaN(filters.firmId) ? filters.firmId.toString() : Number(filters.firmId);
      query.fm_firm_id = mongoose.isValidObjectId(filters.firmId)
        ? mongoose.Types.ObjectId(filters.firmId)
        : { $in: [firmId, filters.firmId.toString()] };
    }

    if (filters.startDate || filters.endDate) {
      query.fm_trans_date = {};
      if (filters.startDate) {
        query.fm_trans_date.$gte = toDateString(filters.startDate);
      }
      if (filters.endDate) {
        query.fm_trans_date.$lte = toDateString(filters.endDate);
      }
    }

    const rollbackRecords = await Finance_Money_Transaction.find(query)
      .select("fm_trans_date fm_firm_id fm_user_id fm_trans_amt fm_cash_amt fm_bank_amt fm_online_amt fm_card_amt")
      .lean()
      .limit(1000);

    return {
      title: "FINANCE EMI ROLLBACK",
      colorClass: "bg-blue",
      amtColor: "text-danger",
      column: ["DATE", "FIRM", "CUSTOMER NAME", "CUST ID", "CASH", "BANK", "ONLINE", "CARD", "DISC"],
      data: rollbackRecords.map(mapToResponse),
    };
  } catch (error) {
    return handleError(error, "FINANCE EMI ROLLBACK", "bg-blue", "text-danger");
  }
};

// Combine all daybook data with parallel queries and filters
const get_all_daybook_data = async (filters = {}) => {
  try {

    const [financeData, paidEmiData, rollbackEmiData] = await Promise.all([
      get_add_new_finance_data(filters),
      get_finance_paid_emi_data(filters),
      get_finance_rollback_emi_data(filters),
    ]);

    return [financeData, paidEmiData, rollbackEmiData];
  } catch (error) {
    console.error("Error combining daybook data:", error);
    return [];
  }
};

module.exports = {
  get_all_daybook_data,
  get_add_new_finance_data,
  get_finance_paid_emi_data,
  get_finance_rollback_emi_data,
};