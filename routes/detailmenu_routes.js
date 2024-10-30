const express = require("express");
const router = express.Router();
router.use(express.json());

const detailmenuController = require(`../controllers/detailmenu_controller`);
const { authorize } = require('../controllers/auth_contoller');
const { IsAdmin } = require("../middlewares/role_validation");



router.post("/",  detailmenuController.detailFromTransaksi);
router.put("/:id",  detailmenuController.editDetailmenu);
router.get("/detailtransaksi/:id",  detailmenuController.getByIdTransaksi);
router.get("/",  detailmenuController.getAllDetailmenu);
router.delete("/del",  detailmenuController.deleteAllDetail);

module.exports = router;
