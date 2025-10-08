const express = require("express");
const router = express.Router();
const controller = require("../controllers/girvi.controller");
const ownerAuthenticate = require("../middleware/owner.authenticate");
router.post("/create",ownerAuthenticate, controller.create_girvi);
router.get("/get",ownerAuthenticate, controller.get_all_girvi);
router.get("/get/:id", ownerAuthenticate,controller.get_girvi_details);
router.put("/update/:id", ownerAuthenticate,controller.update_girvi);
router.delete("/delete/:id",ownerAuthenticate, controller.delete_girvi);

module.exports = router;