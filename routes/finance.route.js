const express = require("express");
const router = express.Router();
const controller = require("../controllers/finance.controller");
const ownerAuthenticate = require("../middleware/owner.authenticate");
router.post("/emi/payment",ownerAuthenticate, controller.payment_finance_emi);
router.get("/payment/history",ownerAuthenticate, controller.get_finance_payment_entries);
router.get("/get/emi",ownerAuthenticate, controller.get_finance_emi);

router.post("/create",ownerAuthenticate, controller.create_finance);
router.get("/get",ownerAuthenticate, controller.get_all_finance);
router.get("/get/:id", ownerAuthenticate,controller.get_finance_details);
router.put("/update/:id", ownerAuthenticate,controller.update_finance);
router.delete("/delete/:id",ownerAuthenticate, controller.delete_finance);

module.exports = router;