const financeService = require('../services/finance.service');
const {
  createFinanceSchema,
} = require('../validation/finance.validation');
const create_finance = async (req, res) => {
  try {
    await createFinanceSchema.validateAsync(req.body);
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
module.exports={get_all_finance,get_finance_details,create_finance,update_finance,delete_finance}