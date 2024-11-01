const express = require("express");
const router = express.Router();
router.use(express.json());

const transaksiController = require(`../controllers/traksaksi_controller`);
const { authorize } = require("../controllers/auth_contoller");
const { IsAdmin } = require("../middlewares/role_validation");

router.get("/pdf/:id", transaksiController.PDFdetailTransaksi);
router.post("/", transaksiController.addTransaksi);
router.put("/bayar/:id", transaksiController.handleBayarTransaksi);
router.get("/", transaksiController.getTransaksis);
router.get("/:id", transaksiController.getTransaksi);
router.delete("/del", transaksiController.deleteAllTransaksi);

module.exports = router;
