const { get_all_trial_balance_data } = require("../services/trial_balance.service");

const get_all_trial_balance_entries = async (req, res) => {
  try {
    const { firmId, startDate, endDate } = req.query;
    // Validate date format (YYYY-MM-DD) if provided
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (startDate && !dateRegex.test(startDate)) {
      return res.status(400).json({
        success: false,
        message: "Invalid start date format. Use YYYY-MM-DD",
      });
    }
    if (endDate && !dateRegex.test(endDate)) {
      return res.status(400).json({
        success: false,
        message: "Invalid end date format. Use YYYY-MM-DD",
      });
    }

    // Validate date range logic if both dates are provided
    if (startDate && endDate) {
      const start = new Date(startDate + "T00:00:00.000Z");
      const end = new Date(endDate + "T00:00:00.000Z");
      if (isNaN(start) || isNaN(end)) {
        return res.status(400).json({
          success: false,
          message: "Invalid date values",
        });
      }
      if (start > end) {
        return res.status(400).json({
          success: false,
          message: "Start date cannot be after end date",
        });
      }
    }

    // Prepare filters object (only include provided parameters)
    const filters = {};
    if (firmId) filters.firmId = firmId;
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;

    const response = await get_all_trial_balance_data(filters);

    return res.status(200).json({
      success: true,
      message: "trial_balance entries fetched successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching trial_balance entries:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch trial_balance entries",
      error: error.message,
    });
  }
};

module.exports = { get_all_trial_balance_entries };