const { get_acc_opening_balance } = require("./account.service");
const Finance_Money_Transaction = require("../models/finance_money_trans.model");
const get_journal_trans_entries = async (filters = {}) => {
    const startDate = filters.startDate;
    const endDate = filters.endDate;
    const journal_trans_entries = await Finance_Money_Transaction.find({
        jrtr_date: {
            $gte: startDate, // e.g. '2025-08-01'
            $lte: endDate    // e.g. '2025-08-31'
        }
    });
    return journal_trans_entries;

}
const get_account_ledger_details = async (filters = {}) => {
    const get_acc_details = await get_acc_opening_balance(filters.firmId, filters.startDate, filters.acc_id);
    const get_opening_balance = (get_acc_details.find(a => a.acc_id === Number(filters.acc_id)) || {}).acc_cash_balance || 0;
    const journal_trans_data = await get_journal_trans_entries(filters);
    return journal_trans_data;
}

module.exports = { get_account_ledger_details }