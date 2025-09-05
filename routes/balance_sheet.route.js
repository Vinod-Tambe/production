const express = require("express");
const router = express.Router();
const ownerAuthenticate = require("../middleware/owner.authenticate");
const controller = require("../controllers/balance_sheet.controller");
router.get("/",ownerAuthenticate, controller.get_all_balance_sheet_entries);
module.exports = router;