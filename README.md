const traditional_account = {
  exp: {
    "Direct Expenses": ["Direct Expenses", "Expenses (Direct)"],
    "Indirect Expenses": ["Expenses (Indirect)", "Indirect Expenses"]
  },
  ren: {
    "Direct Incomes": ["Direct Incomes", "Income (Direct)"],
    "Indirect Incomes": ["Indirect Incomes"]
  }
};

const profit_loss_account = {
  exp: {
    "Duties & Taxes": ["Duties & Taxes"],
    "Misc Expenses": ["Misc Expenses"],
    "Purchase Accounts": ["Purchase Accounts"]
  },
  ren: {
    "Sales Accounts": [] // Add your Sales or Revenue accounts here from dr_accounts if any
  }
};

const capital_account = {
  exp: {},
  ren: {
    "Capital Account": ["Capital Account"],
    "Reserves & Surplus": ["Reserves & Surplus"],
    "Secured Loans": ["Secured Loans"],
    "Unsecured Loans": ["Unsecured Loans"],
    "Provisions": ["Provisions"],
    "Sundry Creditors": ["Sundry Creditors"],
    "Bank OD Account": ["Bank OD Account"],
    "Branch/Divisions": ["Branch/Divisions"],
    "Suspense Account": ["Suspense Account"]
  }
};

module.exports = { traditional_account, profit_loss_account, capital_account };
