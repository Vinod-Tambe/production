const express = require("express");
const router = express.Router();
const firmController = require("../controllers/firm.controller");
const ownerAuthenticate = require("../middleware/owner.authenticate");
router.post("/",ownerAuthenticate, firmController.create_firm);
router.put("/:id",ownerAuthenticate, firmController.update_firm);
router.get("/:id", ownerAuthenticate,firmController.get_firm_by_id);
router.delete("/:id",ownerAuthenticate, firmController.delete_firm);
router.get("/", ownerAuthenticate,firmController.get_all_firm);

module.exports = router;
