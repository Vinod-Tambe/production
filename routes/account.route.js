const express = require("express");
const router = express.Router();
const controller = require("../controllers/account.controller");

router.post("/create", controller.createAccount);
router.get("/get", controller.getAllAccounts);
router.get("/get/:id", controller.getAccountById);
router.put("/update/:id", controller.updateAccount);
router.delete("/delete/:id", controller.deleteAccount);

module.exports = router;
