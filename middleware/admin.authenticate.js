const jwtProvider = require("../config/jwtProvider");
const adminService = require("../services/admin.service");

const admin_authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Validate Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Missing or malformed Authorization header. Use format: 'Bearer <token>'."
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token missing from header."
      });
    }

    // Decode and validate token
    const adminId = await jwtProvider.get_admin_id_by_token(token);
    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please log in again."
      });
    }

    // Retrieve admin details
    const result = await adminService.get_admin_details({ _id: adminId });
    if (!result || !result.data) {
      return res.status(404).json({
        success: false,
        message: "Admin not found for provided token."
      });
    }

    // Attach admin info to request
    req.user = result.data;
    next();

  } catch (error) {
    console.error("Admin Authentication Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication."
    });
  }
};

module.exports = admin_authentication;
