const { get_all_acc_journal_trans } = require("./journal_trans.service");

const get_all_balance_sheet_data=async(filters = {})=>{
const assets_acc_pre_acc_arr = ["Bank Account"];
const get_all_general_trans=await get_all_acc_journal_trans(filters.startDate, filters.endDate, filters.firmId,'N',assets_acc_pre_acc_arr);
return get_all_general_trans;
}

module.exports={get_all_balance_sheet_data}