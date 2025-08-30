const { get_acc_opening_balance } = require("./account.service");
const { get_all_acc_journal_trans } = require("./journal_trans.service");
const get_all_trial_balance_data=async(filters = {})=>{
     const get_acc_details = await get_acc_opening_balance(filters.firmId, filters.startDate);
     const get_journal_trans=await get_all_acc_journal_trans(filters.startDate,filters.endDate,filters.firmId);
return get_journal_trans;
}

module.exports={get_all_trial_balance_data}