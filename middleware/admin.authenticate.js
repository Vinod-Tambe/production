const jwtProvider = require("../config/jwtProvider");
const adminService = require("../services/admin.service");

const admin_authentication = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Authorization header is missing or malformed. Expected format: 'Bearer <token>'." });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Access token is missing from the authorization header." });
        }

        const adminId = await jwtProvider.get_admin_id_by_token(token);
        if (!adminId) {
            return res.status(401).json({ error: "Invalid or expired token. Please log in again." });
        }

        const adminDetails = await adminService.get_admin_details_by_id(adminId);
        if (!adminDetails) {
            return res.status(404).json({ error: "Admin not found. The provided token does not match any user." });
        }

        req.user = adminDetails;
        next();
    } catch (error) {
        console.error("Admin Authentication Error:", error);
        return res.status(500).json({ error: "An internal error occurred during admin authentication. Please try again later." });
    }
};

module.exports = admin_authentication;
