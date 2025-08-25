const { get_all_daybook_data } = require("../services/daybook.service");

const get_all_daybook_entries = async (req, res) => {
  try {
    const { firmId, startDate, endDate } = req.query;

    // Validate date format (DD-MM-YYYY) if provided
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (startDate && !dateRegex.test(startDate)) {
      return res.status(400).json({
        success: false,
        message: "Invalid start date format. Use DD-MM-YYYY",
      });
    }
    if (endDate && !dateRegex.test(endDate)) {
      return res.status(400).json({
        success: false,
        message: "Invalid end date format. Use DD-MM-YYYY",
      });
    }

    // Validate date range logic if both dates are provided
    if (startDate && endDate) {
      const start = new Date(startDate.split("-").reverse().join("-"));
      const end = new Date(endDate.split("-").reverse().join("-"));
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

    const response = await get_all_daybook_data(filters);

    return res.status(200).json({
      success: true,
      message: "Daybook entries fetched successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching daybook entries:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch daybook entries",
      error: error.message,
    });
  }
};

module.exports = { get_all_daybook_entries };