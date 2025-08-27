const { get_acc_opening_balance } = require("./account.service");
const JournalTrans = require('../models/journal_trans.model');
const get_journal_trans_entries = async (filters = {}) => {
    const startDate = filters.startDate;
    const endDate = filters.endDate;
    const journal_trans_entries = await JournalTrans.find({
        jrtr_date: {
            $gte: startDate,
            $lte: endDate
        }
    });
    return journal_trans_entries;

}
const get_account_ledger_details = async (filters = {}) => {
    const get_acc_details = await get_acc_opening_balance(filters.firmId, filters.startDate, filters.acc_id);
    const get_opening_balance = (get_acc_details.find(a => a.acc_id === Number(filters.acc_id)) || {}).acc_cash_balance || 0;
    const acc_name = (get_acc_details.find(a => a.acc_id === Number(filters.acc_id)) || {}).acc_name || "";
    const acc_pre_acc = (get_acc_details.find(a => a.acc_id === Number(filters.acc_id)) || {}).acc_pre_acc || "";
    const journal_trans_data = await get_journal_trans_entries(filters);
    const response = {
        acc_open_balanace: get_opening_balance,
        acc_name: acc_name,
        acc_pre_acc: acc_pre_acc,
        jurnal_trans_data: journal_trans_data || [],
    }
    return response;
}

module.exports = { get_account_ledger_details }