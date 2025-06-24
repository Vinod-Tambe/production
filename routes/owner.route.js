const express = require("express");
const {
  create_owner,
  update_owner,
  delete_owner,
  forgot_password,
  get_owner_by_id,
  get_all_owners
} = require("../controllers/owner.controller");

const router = express.Router();

// Create a new owner
router.post("/create", create_owner);

// Update an existing owner by ID
router.put("/update/:id", update_owner);

// Delete an owner by ID
router.delete("/delete/:id", delete_owner);

// Forgot password (reset via mobile number or login ID)
router.post("/forgot-password", forgot_password);

// ✅ Get a specific owner by ID
router.get("/get/:id", get_owner_by_id);

// ✅ Get all owners
router.get("/get-all", get_all_owners);

module.exports = router;
