const jwtProvider = require("../config/jwtProvider");
const ownerService = require("../services/owner.service");

const owner_authentication = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Authorization header is missing or malformed. Expected format: 'Bearer <token>'." });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Access token is missing from the authorization header." });
        }

        const ownerId = await jwtProvider.get_owner_id_by_token(token);
        if (!ownerId) {
            return res.status(401).json({ error: "Invalid or expired token. Please log in again." });
        }

        const ownerDetails = await ownerService.get_owner_details_by_id(ownerId);
        if (!ownerDetails) {
            return res.status(404).json({ error: "Owner not found. The provided token does not match any user." });
        }

        req.user = ownerDetails;
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(500).json({ error: "An internal error occurred during authentication. Please try again later." });
    }
};

module.exports = owner_authentication;
