const express = require("express");
const router = express.Router();
const firmController = require("../controllers/firm.controller");
const ownerAuthenticate = require("../middleware/owner.authenticate");
router.post("/create",ownerAuthenticate, firmController.create_firm);
router.put("/update/:id",ownerAuthenticate, firmController.update_firm);
router.get("/:id", ownerAuthenticate,firmController.get_firm_by_id);
router.delete("/delete/:id",ownerAuthenticate, firmController.delete_firm);
router.get("/", ownerAuthenticate,firmController.get_all_firm);

module.exports = router;
