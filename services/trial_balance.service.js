const { get_acc_opening_balance, get_all_account } = require("./account.service");
const { get_all_acc_journal_trans } = require("./journal_trans.service");

const get_all_trial_balance_data = async (filters = {}) => {
    try {
        // Validate inputs
        if ( !filters.startDate || !filters.endDate) {
            throw new Error("Missing required filters: startDate, or endDate");
        }

        // Calculate previous day for startDate
        const get_end_date = new Date(new Date(filters.endDate).setDate(new Date(filters.endDate).getDate() - 1)).toISOString().split('T')[0];
        // Fetch data concurrently
        const [previousDayClosing, openingBalances, accounts, journalTransactions] = await Promise.all([
            get_all_acc_journal_trans(null, get_end_date, filters.firmId),
            get_acc_opening_balance(filters.firmId, filters.startDate),
            get_all_account(filters.firmId),
            get_all_acc_journal_trans(filters.startDate, filters.endDate, filters.firmId)
        ]);

        // Create a Map for accounts lookup
        const accountMap = new Map(
            accounts.map(acc => [acc.acc_id, { acc_name: acc.acc_name || 'Unknown', acc_cash_balance: acc.acc_cash_balance || 0 }])
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
                acc_open_balance: accOpenBalance,
                acc_id: accId,
                total_cr_amt: 0,
                total_dr_amt: 0,
                acc_close_balance: accOpenBalance
            });
        }

        // Process previous day's closing balances as opening balances
        for (const PreviousCrDr of previousDayClosing) {
            const accId = Number(PreviousCrDr.acc_id);
            const previousDayBalance = (PreviousCrDr.total_dr_amt || 0) - (PreviousCrDr.total_cr_amt || 0);
            let entry = trialBalanceMap.get(accId);

            if (entry) {
                // Update existing entry with previous day's closing balance as opening balance
                entry.acc_open_balance += previousDayBalance;
                entry.acc_close_balance += previousDayBalance; // Will be updated later with journal transactions
            } else {
                // Create new entry if account not in opening balances
                const account = accountMap.get(accId) || { acc_name: 'Not found', acc_cash_balance: 0 };
                trialBalanceMap.set(accId, {
                    acc_name: account.acc_name,
                    acc_open_balance: previousDayBalance,
                    acc_id: accId,
                    total_cr_amt: 0,
                    total_dr_amt: 0,
                    acc_close_balance: previousDayBalance
                });
            }
        }

        // Process journal transactions
        for (const journal of journalTransactions) {
            const accId = Number(journal.acc_id);
            let entry = trialBalanceMap.get(accId);

            if (!entry) {
                // Create new entry if account not in trialBalanceMap
                const account = accountMap.get(accId) || { acc_name: 'Not found', acc_cash_balance: 0 };
                entry = {
                    acc_name: account.acc_name,
                    acc_open_balance: account.acc_cash_balance,
                    acc_id: accId,
                    total_cr_amt: 0,
                    total_dr_amt: 0,
                    acc_close_balance: account.acc_cash_balance
                };
                trialBalanceMap.set(accId, entry);
            }

            // Update totals
            entry.total_cr_amt += journal.total_cr_amt || 0;
            entry.total_dr_amt += journal.total_dr_amt || 0;
            entry.total_cr_amt=0-entry.total_cr_amt;
            entry.acc_close_balance = (entry.acc_open_balance + entry.total_dr_amt) - Math.abs(entry.total_cr_amt);
        }

        // Convert Map to array for output
        return Array.from(trialBalanceMap.values());
    } catch (error) {
        console.error('Error in get_all_trial_balance_data:', error);
        throw error;
    }
};

module.exports = { get_all_trial_balance_data };