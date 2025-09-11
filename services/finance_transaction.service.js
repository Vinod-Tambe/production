const Finance_Trans = require("../models/finance_trans.model");
const { create_finance_money_entry } = require("./finance_money_trans.service");
const { create_journal_entry } = require("./journal.service");

const create_finance_transaction = async (
  data,
  count = 1,
  fin_freq = 1,
  fin_freq_type = "MONTHLY",
  start_date
) => {
  fin_freq = parseInt(fin_freq, 10);
  // Validate inputs
  if (!Number.isInteger(count) || count < 1) {
    throw new Error("Count must be a positive integer");
  }
  if (!Number.isInteger(fin_freq) || fin_freq < 1) {
    throw new Error("Frequency must be a positive integer");
  }
  if (!["MONTHLY", "DAILY"].includes(fin_freq_type)) {
    throw new Error("Frequency type must be 'MONTHLY' or 'DAILY'");
  }

  // Parse start date
  let startDate;
  try {
    if (start_date) {
      // Check format: YYYY-MM-DD or DD-MM-YYYY
      const dateParts = start_date.split("-").map(Number);
      if (dateParts[0] > 31) {
        // Assume YYYY-MM-DD
        const [year, month, day] = dateParts;
        startDate = new Date(year, month - 1, day);
      } else {
        // Assume DD-MM-YYYY
        const [day, month, year] = dateParts;
        startDate = new Date(year, month - 1, day);
      }
      if (isNaN(startDate.getTime())) {
        throw new Error("Invalid start_date format. Use YYYY-MM-DD or DD-MM-YYYY");
      }
    } else {
      startDate = new Date(data.fm_start_date);
      if (isNaN(startDate.getTime())) {
        throw new Error("Invalid fm_start_date in data");
      }
    }
  } catch (error) {
    throw new Error(`Date parsing error: ${error.message}`);
  }

  const transactions = [];
  let currentStartDate = new Date(startDate);

  for (let i = 1; i <= count; i++) {
    // Calculate due date
    const dueDate = new Date(currentStartDate);
    if (fin_freq_type === "MONTHLY") {
      dueDate.setMonth(dueDate.getMonth() + fin_freq);
    } else if (fin_freq_type === "DAILY") {
      dueDate.setDate(dueDate.getDate() + fin_freq);
    }

    // Create transaction
    const transaction = {
      ...data,
      ft_emi_no: i,
      ft_start_date: formatDate(currentStartDate),
      ft_due_date: formatDate(dueDate),
    };

    transactions.push(transaction);

    // Set next EMI's start date to current due date
    currentStartDate = new Date(dueDate);
  }

  // Insert transactions into database
  try {
    const created = await Finance_Trans.insertMany(transactions);
    return created;
  } catch (error) {
    throw new Error(`Failed to insert transactions: ${error.message}`);
  }
};

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};



const get_Finance_Transaction_EMI = async (firm_id, user_id, fin_id) => {
  return await Finance_Trans.find({
    ft_firm_id: firm_id,
    ft_user_id: user_id,
    ft_fin_id: fin_id
  }).sort({ ft_emi_no: 1 });
};


const update_finance_transaction = async (transData) => {
  const { fm_firm_id, fm_user_id, fm_fin_id, fm_trans_amt, fm_trans_type } = transData;
  try {
    if (fm_trans_amt === 0) {
      return { success: false, message: "Transaction amount cannot be zero." };
    }

    const all_finance_EMI = await get_Finance_Transaction_EMI(fm_firm_id, fm_user_id, fm_fin_id);
    if (!all_finance_EMI?.length) {
      return { success: false, message: "No EMI records found." };
    }

    const total_paid = await get_total_paid_amount(all_finance_EMI);
    let remainingAmount = fm_trans_type === "PAID" ? total_paid + fm_trans_amt : total_paid - fm_trans_amt;

    const updateOperations = [];
    for (const emi of all_finance_EMI) {
      if (remainingAmount <= 0) {
        updateOperations.push({
          updateOne: {
            filter: { _id: emi._id },
            update: { ft_paid_amt: 0, ft_pending_amt: emi.ft_emi_amt || 0, ft_emi_status: 'DUE' }
          }
        });
        continue;
      }

      const emiAmt = emi.ft_emi_amt || 0;
      const paidAmt = Math.min(emiAmt, remainingAmount);
      updateOperations.push({
        updateOne: {
          filter: { _id: emi._id },
          update: {
            ft_paid_amt: paidAmt,
            ft_pending_amt: emiAmt - paidAmt,
            ft_emi_status: paidAmt === emiAmt ? 'PAID' : 'PARTIAL'
          }
        }
      });
      remainingAmount -= paidAmt;
    }

    const updatedEMIs = await Finance_Trans.bulkWrite(updateOperations, { ordered: true });
    //make a jornal entry
    var jornal_request = {};
    if (transData.fm_trans_type == "PAID") {
      jornal_request = {
        "journal_date": {
          "jrnl_date": transData.fm_trans_date, "jrnl_firm_id": transData.fm_firm_id, "jrnl_own_id": transData.fm_own_id,
          "jrnl_user_id": fm_user_id, "jrnl_amt": transData.fm_trans_amt, "jrnl_panel": "Finance", "jrnl_other_info": `${transData.fm_trans_type} EMI AMT | Fin No - ${transData.fm_fin_id}`
        },
        "joural_trans_data": [
          { "jrtr_crdr": "CR", "jrtr_date": transData.fm_trans_date, "jrtr_cr_acc_id": transData.fm_cash_acc_id, "jrtr_cr_amt": transData.fm_cash_amt, "jrtr_acc_info": transData.fm_cash_info },
          { "jrtr_crdr": "CR", "jrtr_date": transData.fm_trans_date, "jrtr_cr_acc_id": transData.fm_bank_acc_id, "jrtr_cr_amt": transData.fm_bank_amt, "jrtr_acc_info": transData.fm_bank_info },
          { "jrtr_crdr": "CR", "jrtr_date": transData.fm_trans_date, "jrtr_cr_acc_id": transData.fm_online_acc_id, "jrtr_cr_amt": transData.fm_online_amt, "jrtr_acc_info": transData.fm_online_info },
          { "jrtr_crdr": "CR", "jrtr_date": transData.fm_trans_date, "jrtr_cr_acc_id": transData.fm_card_acc_id, "jrtr_cr_amt": transData.fm_card_amt, "jrtr_acc_info": transData.fm_card_info },
          { "jrtr_crdr": "DR", "jrtr_date": transData.fm_trans_date, "jrtr_dr_acc_id": transData.fm_dr_acc_id, "jrtr_dr_amt": transData.fm_trans_amt, "jrtr_acc_info": `${transData.fm_trans_type} EMI AMT | Fin No - ${transData.fm_fin_id}` }
        ]
      }
    } else {
      jornal_request = {
        "journal_date": {
          "jrnl_date": transData.fm_trans_date, "jrnl_firm_id": transData.fm_firm_id, "jrnl_own_id": transData.fm_own_id,
          "jrnl_user_id": fm_user_id, "jrnl_amt": transData.fm_trans_amt, "jrnl_panel": "Finance", "jrnl_other_info": `${transData.fm_trans_type} EMI AMT | Fin No - ${transData.fm_fin_id}`
        },
        "joural_trans_data": [
          { "jrtr_crdr": "DR", "jrtr_date": transData.fm_trans_date, "jrtr_dr_acc_id": transData.fm_cash_acc_id, "jrtr_dr_amt": transData.fm_cash_amt, "jrtr_acc_info": transData.fm_cash_info },
          { "jrtr_crdr": "DR", "jrtr_date": transData.fm_trans_date, "jrtr_dr_acc_id": transData.fm_bank_acc_id, "jrtr_dr_amt": transData.fm_bank_amt, "jrtr_acc_info": transData.fm_bank_info },
          { "jrtr_crdr": "DR", "jrtr_date": transData.fm_trans_date, "jrtr_dr_acc_id": transData.fm_online_acc_id, "jrtr_dr_amt": transData.fm_online_amt, "jrtr_acc_info": transData.fm_online_info },
          { "jrtr_crdr": "DR", "jrtr_date": transData.fm_trans_date, "jrtr_dr_acc_id": transData.fm_card_acc_id, "jrtr_dr_amt": transData.fm_card_amt, "jrtr_acc_info": transData.fm_card_info },
          { "jrtr_crdr": "CR", "jrtr_date": transData.fm_trans_date, "jrtr_cr_acc_id": transData.fm_dr_acc_id, "jrtr_cr_amt": transData.fm_trans_amt, "jrtr_acc_info": `${transData.fm_trans_type} EMI AMT | Fin No - ${transData.fm_fin_id}` }
        ]
      }
    }
    const jrnl_id = await create_journal_entry(jornal_request);
    transData.fm_jrnl_id = jrnl_id;
    if (jrnl_id) {
      const moneyEntry = updatedEMIs.modifiedCount > 0 ? await create_finance_money_entry(transData) : null;
    } else {
      return { success: false, message: "Entry Issue Facing Line 167" };
    }
    //make a jornal entry
    return {
      success: true,
      message: 'EMI payment processed successfully.',
      updatedEmis: updatedEMIs.result,
    };
  } catch (error) {
    console.error("Service Error (update_finance_transaction):", error.message);
    return { success: false, message: 'Failed to process EMI payment.', error: error.message };
  }
};

const delete_finance_transaction = async (id) => {
  return await Finance_Trans.deleteMany({ ft_fin_id: id });
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
