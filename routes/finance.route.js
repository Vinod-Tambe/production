const express = require("express");
const router = express.Router();
const controller = require("../controllers/finance.controller");

router.post("/create", controller.createFinance);
router.get("/get", controller.getAllFinance);
router.get("/get/:id", controller.getFinanceDetails);
router.put("/update/:id", controller.updateFinance);
router.delete("/delete/:id", controller.deleteFinance);

module.exports = router;
