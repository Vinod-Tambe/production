const { get_acc_opening_balance } = require("./account.service");
const JournalTrans = require('../models/journal_trans.model');
const get_journal_trans_entries = async (startDate,endDate,acc_id,firm_id="N") => {

    const query = {
        jrtr_date: {
            $gte: startDate,
            $lte: endDate
        },
        $or: [
            { jrtr_cr_acc_id: acc_id },
            { jrtr_dr_acc_id: acc_id }
        ]
    };

    if (firm_id !== "N") {
        query.jrtr_firm_id = firm_id;
    }

    const journal_trans_entries = await JournalTrans.find(query).select('jrtr_id jrtr_cr_amt jrtr_dr_amt jrtr_firm_id jrtr_user_id jrtr_crdr jrtr_acc_info jrtr_other_info jrtr_date');
    return journal_trans_entries;

}
const get_account_ledger_details = async (filters = {}) => {
    const get_acc_details = await get_acc_opening_balance(filters.firmId, filters.startDate, filters.acc_id);
    const get_opening_balance = (get_acc_details.find(a => a.acc_id === Number(filters.acc_id)) || {}).acc_cash_balance || 0;
    const acc_balance_type = (get_acc_details.find(a => a.acc_id === Number(filters.acc_id)) || {}).acc_balance_type || "CR";
    const acc_name = (get_acc_details.find(a => a.acc_id === Number(filters.acc_id)) || {}).acc_name || "";
    const acc_pre_acc = (get_acc_details.find(a => a.acc_id === Number(filters.ascc_id)) || {}).acc_pre_acc || "";
    const journal_trans_data = await get_journal_trans_entries(filters.startDate,filters.endDate,filters.acc_id,filters.firmId);
    const response = {
        acc_open_balanace: get_opening_balance,
        acc_balance_type:acc_balance_type,
        acc_name: acc_name,
        acc_pre_acc: acc_pre_acc,
        jurnal_trans_data: journal_trans_data || [],
    }
    return response;
}

module.exports = { get_account_ledger_details }