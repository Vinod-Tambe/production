const express = require("express");
const {
  create_owner,
  update_owner,
  delete_owner,
  forgot_password,
  get_owner_by_id,
  get_all_owners
} = require("../controllers/owner.controller");
const adminAuthenticate = require("../middleware/admin.authenticate");
const router = express.Router();

// Create a new owner
router.post("/create",adminAuthenticate, create_owner);

// Update an existing owner by ID
router.put("/update/:id",adminAuthenticate, update_owner);

// Delete an owner by ID
router.delete("/delete/:id", adminAuthenticate,delete_owner);

// Forgot password (reset via mobile number or login ID)
router.post("/forgot-password",adminAuthenticate, forgot_password);

// ✅ Get a specific owner by ID
router.get("/get/:id", get_owner_by_id);

// ✅ Get all owners
router.get("/get-all",adminAuthenticate, get_all_owners);

module.exports = router;
