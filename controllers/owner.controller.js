const ownerService = require("../services/owner.service");
const jwtProvider = require("../config/jwtProvider");
const { validateOwner } = require("../validation/owner.validation"); // Import validation function
// const { send_telegram_msg } = require("../services/message.service");

const create_owner = async (req, res) => {
  try {
    // Step 1: Validate request body
    const { error } = validateOwner(req.body);
    if (error) {
      return res.status(400).json({
        error: true,
        message: "Validation failed",
        details: error.details.map((err) => err.message),
      });
    }

    // Step 2: Create new owner
    const owner_details = await ownerService.create_new_owner(req.body);

    // Step 3: Generate JWT token
    const jwt = jwtProvider.generateToken(owner_details._id);

    // Step 4: (Optional) Send Telegram message
    // const message = `🧑‍💼 ${owner_details.own_fname} ${owner_details.own_lname} registered as an Owner. Mobile: ${owner_details.own_mobile_no}.`;
    // await send_telegram_msg(message);

    // Step 5: Send success response
    return res.status(201).json({
      jwt,
      owner_details,
      error: false,
      message: "Owner created successfully.",
    });
  } catch (error) {
    console.error("Error creating owner:", error);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  create_owner,
};
