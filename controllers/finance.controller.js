const financeService = require('../services/finance.service');
const {
  createFinanceSchema,
  updateFinanceSchema,
  idParamSchema,
} = require('../validation/finance.validation');

exports.createFinance = async (req, res) => {
  try {
    await createFinanceSchema.validateAsync(req.body);
    const finance = await financeService.createFinance(req.body);
    res.status(200).json({
      success: true,
      message: 'Finance record created successfully',
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

exports.updateFinance = async (req, res) => {
  try {
    const fin_id = parseInt(req.params.fin_id, 10);
    await idParamSchema.validateAsync({ fin_id });

    const data = { ...req.body, fin_id };
    await updateFinanceSchema.validateAsync(data);

    const finance = await financeService.updateFinance(fin_id, req.body);
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

exports.deleteFinance = async (req, res) => {
  try {
    const fin_id = parseInt(req.params.fin_id, 10);
    await idParamSchema.validateAsync({ fin_id });

    await financeService.deleteFinance(fin_id);
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

exports.getFinanceDetails = async (req, res) => {
  try {
    const fin_id = parseInt(req.params.fin_id, 10);
    await idParamSchema.validateAsync({ fin_id });

    const finance = await financeService.getFinanceDetails(fin_id);
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

exports.getAllFinance = async (req, res) => {
  try {
    const financeList = await financeService.getAllFinance();
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
