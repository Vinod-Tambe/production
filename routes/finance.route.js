const express = require("express");
const router = express.Router();
const controller = require("../controllers/finance.controller");

router.post("/create", controller.create_finance);
router.get("/get", controller.get_all_finance);
router.get("/get/:id", controller.get_finance_details);
router.put("/update/:id", controller.update_finance);
router.delete("/delete/:id", controller.delete_finance);

module.exports = router;
