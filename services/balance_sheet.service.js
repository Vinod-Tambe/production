const { get_all_acc_journal_trans } = require("./journal_trans.service");
const { get_acc_opening_balance, get_all_account } = require("./account.service");
const get_all_balance_sheet_data = async (filters = {}) => {
    try {
        // Validate inputs
        if (!filters.startDate || !filters.endDate) {
            throw new Error("Missing required filters: startDate, or endDate");
        }

        // Calculate previous day for startDate
        const get_end_date = new Date(new Date(filters.startDate).setDate(new Date(filters.startDate).getDate() - 1)).toISOString().split('T')[0];
        // Fetch data concurrently
        const [previousDayClosing, openingBalances, accounts, journalTransactions] = await Promise.all([
            get_all_acc_journal_trans(null, get_end_date, filters.firmId),
            get_acc_opening_balance(filters.firmId, filters.startDate),
            get_all_account(filters.firmId),
            get_all_acc_journal_trans(filters.startDate, filters.endDate, filters.firmId)
        ]);

        // Create a Map for accounts lookup
        const accountMap = new Map(
            accounts.map(acc => [acc.acc_id, { acc_name: acc.acc_name || 'Unknown', acc_pre_acc: acc.acc_pre_acc || 'Unknown', acc_cash_balance: acc.acc_cash_balance || 0 }])
        );

        // Initialize trial balance Map for efficient updates
        const trialBalanceMap = new Map();

        // Process opening balances
        for (const acc of openingBalances) {
            const accId = Number(acc.acc_id);
            let accOpenBalance = acc.acc_cash_balance || 0;
            if (acc.acc_balance_type === 'CR') {
                accOpenBalance = 0 - accOpenBalance;
            }
            trialBalanceMap.set(accId, {
                acc_name: acc.acc_name || 'Unknown',
                acc_pre_acc: acc.acc_pre_acc,
                acc_open_balance: accOpenBalance,
                acc_id: accId,
                total_cr_amt: 0,
                total_dr_amt: 0,
                acc_balance: accOpenBalance
            });
        }

        // Process previous day's closing balances as opening balances
        for (const PreviousCrDr of previousDayClosing) {
            const accId = Number(PreviousCrDr.acc_id);
            const previousDayBalance = (PreviousCrDr.total_dr_amt || 0) - (PreviousCrDr.total_cr_amt || 0);
            let entry = trialBalanceMap.get(accId);

            if (entry) {
                // Update existing entry with previous day's closing balance as opening balance
                entry.acc_open_balance = entry.acc_open_balance + previousDayBalance;
            } else {
                // Create new entry if account not in opening balances
                const account = accountMap.get(accId) || { acc_name: 'Not found', acc_pre_acc: 'NOF', acc_cash_balance: 0 };
                trialBalanceMap.set(accId, {
                    acc_name: account.acc_name,
                    acc_pre_acc: account.acc_pre_acc,
                    acc_open_balance: previousDayBalance,
                    acc_id: accId,
                    total_cr_amt: 0,
                    total_dr_amt: 0,
                    acc_balance: previousDayBalance
                });
            }
        }

        // Process journal transactions
        for (const journal of journalTransactions) {
            const accId = Number(journal.acc_id);
            let entry = trialBalanceMap.get(accId);

            if (!entry) {
                // Create new entry if account not in trialBalanceMap
                const allAccount = accountMap.get(accId) || { acc_name: 'Not found', acc_pre_acc: 'NOF', acc_cash_balance: 0 };
                entry = {
                    acc_name: allAccount.acc_name,
                    acc_pre_acc: allAccount.acc_pre_acc,
                    acc_open_balance: allAccount.acc_cash_balance,
                    acc_id: accId,
                    total_cr_amt: 0,
                    total_dr_amt: 0,
                    acc_balance: allAccount.acc_cash_balance
                };
                trialBalanceMap.set(accId, entry);
            }

            // Update totals
            entry.total_cr_amt += journal.total_cr_amt || 0;
            entry.total_dr_amt += journal.total_dr_amt || 0;
            entry.total_cr_amt = 0 - entry.total_cr_amt;
        }
        const assetsObj = {};
        const liabilitiesObj = {};

        const liabilityGroups = [
            "Capital Account",
            "Loans",
            "Reserves & Surplus",
            "Sundry Creditors",
            "Duties & Taxes",
            "Provisions",
            "Suspense Account",
            "Branch/Divisions" // sometimes under liabilities
        ];

        const assetGroups = [
            "Bank Accounts",
            "Cash In Hand",
            "Deposits",
            "Fixed Assets",
            "Investments",
            "Loans & Advances",
            "Misc. Expenses",
            "Stock In Hand",
            "Sundry Debtors"
        ];
        // Convert Map to aggregated objects
        for (const [key, value] of trialBalanceMap.entries()) {
            value.acc_balance = (value.acc_open_balance + value.total_dr_amt) - Math.abs(value.total_cr_amt);
            // console.log(value.acc_balance);
            if (value.acc_balance === 0) {
                trialBalanceMap.delete(key);
                continue;
            }
            // console.log(value);
            if (assetGroups.indexOf(value.acc_pre_acc) !== -1) {
                // Sum balances by acc_pre_acc
                if (!assetsObj[value.acc_pre_acc]) assetsObj[value.acc_pre_acc] = 0;
                assetsObj[value.acc_pre_acc] += value.acc_balance;

            } else if (liabilityGroups.indexOf(value.acc_pre_acc) !== -1) {
                if (!liabilitiesObj[value.acc_pre_acc]) liabilitiesObj[value.acc_pre_acc] = 0;
                liabilitiesObj[value.acc_pre_acc] += value.acc_balance;
            }

            delete value.total_cr_amt;
            delete value.total_dr_amt;
            delete value.acc_open_balance;
        }

        // Convert aggregated objects back to arrays of objects
        const assets = Object.entries(assetsObj).map(([key, val]) => ({ [key]: val }));
        const liabilities = Object.entries(liabilitiesObj).map(([key, val]) => ({ [key]: val }));
        return {
            assets,
            liabilities
        };
    } catch (error) {
        console.error('Error in get_all_trial_balance_data:', error);
        throw error;
    }
};


module.exports = { get_all_balance_sheet_data }