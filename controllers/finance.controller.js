const financeService = require('../services/finance.service');
const { get_finance_money_entries } = require('../services/finance_money_trans.service');
const { update_finance_transaction, get_Finance_Transaction_EMI } = require('../services/finance_transaction.service');
const { getOwnerIdFromToken } = require('../utils/tokenHelper');
const {
  createFinanceSchema,
} = require('../validation/finance.validation');
const create_finance = async (req, res) => {
  try {
    const ownerId = await getOwnerIdFromToken(req);
    req.body.fin_own_id = Number(ownerId);
    const { error } = await createFinanceSchema.validateAsync(req.body);
    if (error) {
      return res.status(200).json({
        success: false,
        message: error.details.map((err) => err.message).join(", "),
      });
    }
    const finance = await financeService.create_finance(req.body);
    res.status(200).json({
      success: true,
      message: 'Finance Add successfully',
      data: finance,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: 'Failed to create finance record',
      error: err.message,
    });
  }
};
const update_finance = async (req, res) => {
  try {
    const { id } = req.params;
    await createFinanceSchema.validateAsync(req.body);

    const finance = await financeService.update_finance(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Finance record updated successfully',
      data: finance,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: 'Failed to update finance record',
      error: err.message,
    });
  }
};

const delete_finance = async (req, res) => {
  try {
    const { id } = req.params;

    await financeService.delete_finance(id);
    res.status(200).json({
      success: true,
      message: 'Finance record deleted successfully',
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: 'Failed to delete finance record',
      error: err.message,
    });
  }
};

const get_finance_details = async (req, res) => {
  try {
    const { id } = req.params;
    const finance = await financeService.get_finance_details(id);
    res.status(200).json({
      success: true,
      message: 'Finance record fetched successfully',
      data: finance,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: 'Failed to fetch finance record',
      error: err.message,
    });
  }
};

const get_all_finance = async (req, res) => {
  try {
    const financeList = await financeService.get_all_finance();
    res.status(200).json({
      success: true,
      message: 'Finance records fetched successfully',
      data: financeList,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: 'Failed to fetch finance records',
      error: err.message,
    });
  }
};
const payment_finance_emi = async (req, res) => {
  try {
    const ownerId = await getOwnerIdFromToken(req);
    req.body.fm_own_id = ownerId;
    const finance = await update_finance_transaction(req.body);
    res.status(200).json({
      success: true,
      message: 'Finance EMI Money Transaction Successfully...',
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: 'Failed to paid finance EMI',
      error: err.message,
    });
  }
};
// GET Controller
const get_finance_payment_entries = async (req, res) => {
  try {
    const { fm_user_id, fm_firm_id, fm_fin_id } = req.query;

    const filter = {};
    if (fm_user_id) filter.fm_user_id = fm_user_id;
    if (fm_firm_id) filter.fm_firm_id = fm_firm_id;
    if (fm_fin_id)  filter.fm_fin_id  = fm_fin_id;

    const transactions = await get_finance_money_entries(filter);

    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      data: transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
      error: error.message
    });
  }
};
async function get_finance_emi(req, res) {
  try {
    const { fin_firm_id, fin_user_id, fin_id } = req.query;
    const transaction = await get_Finance_Transaction_EMI(fin_firm_id, fin_user_id, fin_id);
    if (!transaction) {
      return res.status(404).json({ message: 'Finance transaction not found' });
    }
     res.status(200).json({
      success: true,
      message: "success to fetch transactions",
      data: transaction
    });
  } catch (error) {
    console.error('Get finance transaction error:', error);
    res.status(500).json({ message: 'Failed to get finance transaction', error: error.message });
  }
}

module.exports = { get_all_finance, get_finance_details, create_finance, update_finance, delete_finance, payment_finance_emi, get_finance_emi,get_finance_payment_entries }