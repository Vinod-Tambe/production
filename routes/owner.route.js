const express = require("express");
const { create_owner } = require("../controllers/owner.controller");

const router = express.Router();

// Use POST for creating a new owner
router.post("/create", create_owner);

module.exports = router;
