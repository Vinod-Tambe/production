const express = require("express");
const router = express.Router();
const ownerAuthenticate = require("../middleware/owner.authenticate");
const controller = require("../controllers/daybook.controller");
router.get("/",ownerAuthenticate, controller.get_all_daybook_entries);
module.exports = router;