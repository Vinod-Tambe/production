const express = require("express");
const router = express.Router();
const firmController = require("../controllers/firm.controller");
const ownerAuthenticate = require("../middleware/owner.authenticate");
const upload = require("../middleware/multer.authenticate");

// Define multer upload fields matching frontend file input names
const uploadFields = upload.fields([
    { name: "right_logo_file", maxCount: 1 },
    { name: "left_logo_file", maxCount: 1 },
    { name: "qr_code_file", maxCount: 1 },
]);

// Create firm with authentication and file upload handling
router.post(
    "/create",
    ownerAuthenticate,
    uploadFields,
    firmController.create_firm
);

// Update firm (also with upload handling)
router.put(
    "/update/:id",
    ownerAuthenticate,
    uploadFields,
    firmController.update_firm
);

// Get firm by ID
router.get("/:id", ownerAuthenticate, firmController.get_firm_by_id);

// Delete firm by ID
router.delete("/delete/:id", ownerAuthenticate, firmController.delete_firm);

// Get all firms
router.get("/", ownerAuthenticate, firmController.get_all_firm);

module.exports = router;
