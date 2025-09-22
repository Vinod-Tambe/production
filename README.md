// Expenditure Accounts (goes to Profit & Loss - Debit side)
const expenditure_accounts = [
  { acc_name: "Direct Expenses", acc_pre_acc: "Direct Expenses" },
  { acc_name: "Expenses (Direct)", acc_pre_acc: "Direct Expenses" },
  { acc_name: "Expenses (Indirect)", acc_pre_acc: "Indirect Expenses" },
  { acc_name: "Indirect Expenses", acc_pre_acc: "Indirect Expenses" },
  { acc_name: "Purchase Accounts", acc_pre_acc: "Purchase Accounts" },
  { acc_name: "Misc Expenses", acc_pre_acc: "Misc. Expenses (Asset)" } // Deferred Revenue Exp.
];

// Revenue Accounts (goes to Profit & Loss - Credit side)
const revenue_accounts = [
  { acc_name: "Direct Incomes", acc_pre_acc: "Direct Incomes" },
  { acc_name: "Income (Direct)", acc_pre_acc: "Direct Incomes" },
  { acc_name: "Indirect Incomes", acc_pre_acc: "Indirect Incomes" }
];

module.exports = { expenditure_accounts, revenue_accounts };
