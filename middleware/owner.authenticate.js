const jwtProvider = require("../config/jwtProvider");
const ownerService = require("../services/owner.service");

const owner_authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check if the Authorization header exists and is in correct format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Missing or malformed Authorization header. Expected format: 'Bearer <token>'."
      });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token is missing from the Authorization header."
      });
    }

    // 3. Validate and decode token to get owner ID
    const ownerId = await jwtProvider.get_owner_id_by_token(token);
    if (!ownerId) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please log in again."
      });
    }

    // 4. Fetch owner details
    const result = await ownerService.get_owner_details({ _id: ownerId });
    if (!result || !result.data) {
      return res.status(404).json({
        success: false,
        message: "Owner not found for the provided token."
      });
    }

    // 5. Attach owner details to request object
    req.user = result.data;
    next();

  } catch (error) {
    console.error("Owner Authentication Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during owner authentication."
    });
  }
};

module.exports = owner_authentication;
