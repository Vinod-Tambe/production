const express = require('express');
const router = express.Router();
const financeTransactionController = require('../controllers/finance_transaction.controller');
router.get('/get', financeTransactionController.get_Finance_Transaction_EMI);

module.exports = router;
