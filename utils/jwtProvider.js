const jwt = require("jsonwebtoken");
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

// ✅ Generate token with 48h expiry
const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
};

// ✅ Get Owner ID from token
const get_owner_id_by_token = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId; // or decodedToken.userId.ownerId if your token stores more structure
};

// ✅ Get Admin ID from token
const get_admin_id_by_token = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId.adminId; // only works if token payload is like { userId: { adminId: ... } }
};

// ✅ 🔐 NEW: Get Generic User ID from token
const get_user_id_by_token = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId;
};

module.exports = {
  generateToken,
  get_owner_id_by_token,
  get_admin_id_by_token,
  get_user_id_by_token // ✅ export newly added function
};
