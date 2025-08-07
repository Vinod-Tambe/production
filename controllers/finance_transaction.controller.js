const financeTransactionService = require('../services/finance_transaction.service'); // adjust path



// Get a single transaction by id
async function get_Finance_Transaction_EMI(req, res) {
    try {
        const { firm_id, user_id, fin_id } = req.query;

        const transaction = await financeTransactionService.get_Finance_Transaction_EMI(firm_id, user_id, fin_id);
        if (!transaction) {
            return res.status(404).json({ message: 'Finance transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        console.error('Get finance transaction error:', error);
        res.status(500).json({ message: 'Failed to get finance transaction', error: error.message });
    }
}

module.exports = {
    get_Finance_Transaction_EMI,
};
