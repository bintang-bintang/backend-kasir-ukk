const express = require("express");
const router = express.Router();
router.use(express.json());

const menuController = require(`../controllers/menu_controller`);
const { authorize } = require('../controllers/auth_contoller');
const { IsAdmin } = require("../middlewares/role_validation");



router.get("/nota", menuController.nota);
router.post("/add",  menuController.createMenu);
router.put("/upd/:id", menuController.updMenu);
router.get("/", menuController.getMenus);
router.get("/:id", menuController.getMenu);
router.delete("/del/:id", menuController.delMenu);

module.exports = router;
