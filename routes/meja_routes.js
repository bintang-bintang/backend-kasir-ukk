const express = require("express");
const router = express.Router();
router.use(express.json());

const mejaController = require(`../controllers/meja_controller`);
const { authorize } = require('../controllers/auth_contoller');
const { IsAdmin } = require("../middlewares/role_validation");



router.post("/add",  mejaController.createMeja);
router.put("/upd/:id", mejaController.updMeja);
router.get("/", mejaController.getMejas);
router.get("/:id", mejaController.getMeja);
router.delete("/del/:id", mejaController.delMeja);

module.exports = router;
