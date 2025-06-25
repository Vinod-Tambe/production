const jwtProvider = require("../utils/jwtProvider");
const ownerService = require("../services/owner.service");

const owner_authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check for Bearer token format
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
        message: "Access token is missing."
      });
    }

    // 3. Decode token and get owner ID
    const payload = await jwtProvider.get_owner_id_by_token(token);
    const ownerId = payload?.userId || payload?._id || payload;

    if (!ownerId) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please log in again."
      });
    }

    // 4. Fetch owner from DB
    const owner = await ownerService.get_owner_details_by_id(ownerId);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found."
      });
    }

    // 5. Attach owner to request and proceed
    req.user = owner;
    next();

  } catch (error) {
    console.error("Owner Authentication Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication."
    });
  }
};

module.exports = owner_authentication;
