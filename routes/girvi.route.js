const express = require("express");
const router = express.Router();
const controller = require("../controllers/girvi.controller");
const ownerAuthenticate = require("../middleware/owner.authenticate");
const { validateUnsecuredGirviSchema, validateSecuredGirviSchema } = require("../validation/girvi.validation");
router.post("/unsecured/create",ownerAuthenticate,validateUnsecuredGirviSchema, controller.create_girvi);
router.post("/secured/create",ownerAuthenticate,validateSecuredGirviSchema, controller.create_girvi);
router.get("/get",ownerAuthenticate, controller.get_all_girvi);
router.get("/get/:id", ownerAuthenticate,controller.get_girvi_details);
router.put("/update/:id", ownerAuthenticate,controller.update_girvi);
router.delete("/delete/:id",ownerAuthenticate, controller.delete_girvi);

module.exports = router;