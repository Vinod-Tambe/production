const ownerService = require("../services/owner.service");
const jwtProvider = require("../config/jwtProvider");
// const { send_telegram_msg } = require("../services/message.service");

const create_owner = async (req, res) => {
  try {
    // Create new owner
    const owner_details = await ownerService.create_new_owner(req.body);

    // Generate JWT token
    const jwt = jwtProvider.generateToken(owner_details._id);

    // Optional: Send Telegram notification
    // const message = `🧑‍💼 ${owner_details.own_first_name} ${owner_details.own_last_name} registered as an Owner. Mobile: ${owner_details.own_mobile}, Email: ${owner_details.own_email}.`;
    // await send_telegram_msg(message);

    // Send success response
    return res.status(201).json({
      jwt,
      owner_details,
      error: false,
      message: "Owner created successfully."
    });
  } catch (error) {
    console.error("Error creating owner:", error);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error"
    });
  }
};

module.exports = {
  create_owner
};
