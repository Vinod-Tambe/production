const express = require("express");
const router = express.Router();
const ownerAuthenticate = require("../middleware/owner.authenticate");
const controller = require("../controllers/trial_balance.controller");
router.get("/",ownerAuthenticate, controller.get_all_trial_balance_entries);
module.exports = router;