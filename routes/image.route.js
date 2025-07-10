const express = require("express");
const { get_image_file } = require("../controllers/image.controller");

const router = express.Router();
router.get("/:folder/:image", get_image_file);


module.exports = router;
