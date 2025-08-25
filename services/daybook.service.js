const mongoose = require("mongoose");
const Finance = require("../models/finance.modal");
const Finance_Money_Transaction = require("../models/finance_money_trans.model");

// Reusable function to format date as DD-MM-YYYY
const formatDateToDDMMYYYY = (date) => {
  if (!date) return "";
  let d;
  if (typeof date === "string" && date.match(/^\d{2}-\d{2}-\d{4}$/)) {
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
  const toNumber = (value) => (parseFloat(value) || 0).toFixed(2);

  return {
    db_date: formatDateToDDMMYYYY(item.fin_start_date || item.fm_trans_date),
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
const handleError = (error, title, colorClass, amtColor, isSummary = false) => {
  console.error(`Error fetching ${title} data:`, error);
  return {
    title,
    colorClass,
    amtColor,
    column: isSummary
      ? ["TYPE", "CASH", "BANK", "ONLINE", "CARD"]
      : ["DATE", "FIRM", "CUSTOMER NAME", "CUST ID", "CASH", "BANK", "ONLINE", "CARD", "DISC"],
    data: [],
    error: error.message,
  };
};

// Convert DD-MM-YYYY to string for string-based date queries
const toDateString = (dateStr) => {
  if (!dateStr || !dateStr.match(/^\d{2}-\d{2}-\d{4}$/)) {
    throw new Error(`Invalid date format: ${dateStr}. Expected DD-MM-YYYY`);
  }
  return dateStr;
};

// Calculate the date before the given startDate in DD-MM-YYYY format
const getDateBefore = (dateStr) => {
  if (!dateStr || !dateStr.match(/^\d{2}-\d{2}-\d{4}$/)) {
    throw new Error(`Invalid date format: ${dateStr}. Expected DD-MM-YYYY`);
  }
  const [day, month, year] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() - 1);
  const prevDay = String(date.getUTCDate()).padStart(2, "0");
  const prevMonth = String(date.getUTCMonth() + 1).padStart(2, "0");
  const prevYear = date.getUTCFullYear();
  return `${prevDay}-${prevMonth}-${prevYear}`;
};

// Fetch finance added data with filters
const get_add_new_finance_data = async (filters = {}) => {
  try {
    const query = {};
    if (filters.firmId) {
      const firmId = isNaN(filters.firmId) ? filters.firmId.toString() : Number(filters.firmId);
      query.fin_firm_id = mongoose.isValidObjectId(filters.firmId)
        ? mongoose.Types.ObjectId(filters.firmId)
        : { $in: [firmId, filters.firmId.toString()] };
    }

    if (filters.startDate || filters.endDate) {
      query.fin_start_date = {};
      if (filters.startDate) {
        query.fin_start_date.$gte = toDateString(filters.startDate);
      }
      if (filters.endDate) {
        query.fin_start_date.$lte = toDateString(filters.endDate);
      }
    }

    const financeRecords = await Finance.find(query)
      .select("fin_start_date fin_firm_id fin_user_id fin_cash_amt fin_bank_amt fin_online_amt fin_card_amt")
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
    const [financeData, paidEmiData, rollbackEmiData, summaryData] = await Promise.all([
      get_add_new_finance_data(filters),
      get_finance_paid_emi_data(filters),
      get_finance_rollback_emi_data(filters),
      get_day_book_summary(filters),
    ]);

    return [financeData, paidEmiData, rollbackEmiData, summaryData];
  } catch (error) {
    console.error("Error combining daybook data:", error);
    return [];
  }
};

// Fetch daybook summary with totals for cash, bank, online, and card amounts before startDate
const get_day_book_summary = async (filters = {}) => {
  try {
    // Query for Finance collection (FINANCE ADDED)
    const financeQuery = {};
    if (filters.firmId) {
      const firmId = isNaN(filters.firmId) ? filters.firmId.toString() : Number(filters.firmId);
      financeQuery.fin_firm_id = mongoose.isValidObjectId(filters.firmId)
        ? mongoose.Types.ObjectId(filters.firmId)
        : { $in: [firmId, filters.firmId.toString()] };
    }
    if (filters.startDate) {
      financeQuery.fin_start_date = { $lt: toDateString(filters.startDate) };
    }

    // Query for Finance_Money_Transaction collection (PAID)
    const paidQuery = { fm_trans_type: "PAID" };
    if (filters.firmId) {
      const firmId = isNaN(filters.firmId) ? filters.firmId.toString() : Number(filters.firmId);
      paidQuery.fm_firm_id = mongoose.isValidObjectId(filters.firmId)
        ? mongoose.Types.ObjectId(filters.firmId)
        : { $in: [firmId, filters.firmId.toString()] };
    }
    if (filters.startDate) {
      paidQuery.fm_trans_date = { $lt: toDateString(filters.startDate) };
    }

    // Query for Finance_Money_Transaction collection (ROLLBACK)
    const rollbackQuery = { fm_trans_type: "ROLLBACK" };
    if (filters.firmId) {
      const firmId = isNaN(filters.firmId) ? filters.firmId.toString() : Number(filters.firmId);
      rollbackQuery.fm_firm_id = mongoose.isValidObjectId(filters.firmId)
        ? mongoose.Types.ObjectId(filters.firmId)
        : { $in: [firmId, filters.firmId.toString()] };
    }
    if (filters.startDate) {
      rollbackQuery.fm_trans_date = { $lt: toDateString(filters.startDate) };
    }

    // Execute all queries in parallel
    const [finance_add_data, finance_emi_paid_data, finance_emi_rollback_data] = await Promise.all([
      Finance.aggregate([
        { $match: financeQuery },
        {
          $group: {
            _id: null,
            total_cash_amt: {
              $sum: {
                $convert: {
                  input: "$fin_cash_amt",
                  to: "double",
                  onError: 0,
                  onNull: 0,
                },
              },
            },
            total_bank_amt: {
              $sum: {
                $convert: {
                  input: "$fin_bank_amt",
                  to: "double",
                  onError: 0,
                  onNull: 0,
                },
              },
            },
            total_online_amt: {
              $sum: {
                $convert: {
                  input: "$fin_online_amt",
                  to: "double",
                  onError: 0,
                  onNull: 0,
                },
              },
            },
            total_card_amt: {
              $sum: {
                $convert: {
                  input: "$fin_card_amt",
                  to: "double",
                  onError: 0,
                  onNull: 0,
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            total_cash_amt: 1,
            total_bank_amt: 1,
            total_online_amt: 1,
            total_card_amt: 1,
          },
        },
      ]),
      Finance_Money_Transaction.aggregate([
        { $match: paidQuery },
        {
          $group: {
            _id: null,
            total_cash_amt: {
              $sum: {
                $convert: {
                  input: "$fm_cash_amt",
                  to: "double",
                  onError: 0,
                  onNull: 0,
                },
              },
            },
            total_bank_amt: {
              $sum: {
                $convert: {
                  input: "$fm_bank_amt",
                  to: "double",
                  onError: 0,
                  onNull: 0,
                },
              },
            },
            total_online_amt: {
              $sum: {
                $convert: {
                  input: "$fm_online_amt",
                  to: "double",
                  onError: 0,
                  onNull: 0,
                },
              },
            },
            total_card_amt: {
              $sum: {
                $convert: {
                  input: "$fm_card_amt",
                  to: "double",
                  onError: 0,
                  onNull: 0,
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            total_cash_amt: 1,
            total_bank_amt: 1,
            total_online_amt: 1,
            total_card_amt: 1,
          },
        },
      ]),
      Finance_Money_Transaction.aggregate([
        { $match: rollbackQuery },
        {
          $group: {
            _id: null,
            total_cash_amt: {
              $sum: {
                $convert: {
                  input: "$fm_cash_amt",
                  to: "double",
                  onError: 0,
                  onNull: 0,
                },
              },
            },
            total_bank_amt: {
              $sum: {
                $convert: {
                  input: "$fm_bank_amt",
                  to: "double",
                  onError: 0,
                  onNull: 0,
                },
              },
            },
            total_online_amt: {
              $sum: {
                $convert: {
                  input: "$fm_online_amt",
                  to: "double",
                  onError: 0,
                  onNull: 0,
                },
              },
            },
            total_card_amt: {
              $sum: {
                $convert: {
                  input: "$fm_card_amt",
                  to: "double",
                  onError: 0,
                  onNull: 0,
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            total_cash_amt: 1,
            total_bank_amt: 1,
            total_online_amt: 1,
            total_card_amt: 1,
          },
        },
      ]),
    ]);

    // Format totals to two decimal places
    const toNumber = (value) => (parseFloat(value) || 0).toFixed(2);

    // Calculate opening balances
    const cash_open_amt = toNumber(
      (parseFloat(finance_emi_paid_data[0]?.total_cash_amt || 0)) -
      (parseFloat(finance_add_data[0]?.total_cash_amt || 0) + parseFloat(finance_emi_rollback_data[0]?.total_cash_amt || 0))
    );
    const bank_open_amt = toNumber(
      (parseFloat(finance_emi_paid_data[0]?.total_bank_amt || 0)) -
      (parseFloat(finance_add_data[0]?.total_bank_amt || 0) + parseFloat(finance_emi_rollback_data[0]?.total_bank_amt || 0))
    );
    const online_open_amt = toNumber(
      (parseFloat(finance_emi_paid_data[0]?.total_online_amt || 0)) -
      (parseFloat(finance_add_data[0]?.total_online_amt || 0) + parseFloat(finance_emi_rollback_data[0]?.total_online_amt || 0))
    );
    const card_open_amt = toNumber(
      (parseFloat(finance_emi_paid_data[0]?.total_card_amt || 0)) -
      (parseFloat(finance_add_data[0]?.total_card_amt || 0) + parseFloat(finance_emi_rollback_data[0]?.total_card_amt || 0))
    );
    const total_open_amt = toNumber(
      parseFloat(cash_open_amt) + parseFloat(bank_open_amt) + parseFloat(online_open_amt) + parseFloat(card_open_amt)
    );

    return {
      title: "DAYBOOK SUMMARY",
      colorClass: "bg-purple",
      amtColor: "text-primary",
      column: ["TYPE", "CASH", "BANK", "ONLINE", "CARD"],
      data: [
        {
          type: "OPENING BALANCE",
          total_cash_amt: cash_open_amt,
          total_bank_amt: bank_open_amt,
          total_online_amt: online_open_amt,
          total_card_amt: card_open_amt,
          total_open_amt: total_open_amt,
        }
      ],
    };
  } catch (error) {
    return handleError(error, "DAYBOOK SUMMARY", "bg-purple", "text-primary", true);
  }
};

module.exports = {
  get_all_daybook_data,
  get_add_new_finance_data,
  get_finance_paid_emi_data,
  get_finance_rollback_emi_data,
  get_day_book_summary,
};