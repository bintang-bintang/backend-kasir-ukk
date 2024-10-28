const express = require("express");
const router = express.Router();
router.use(express.json());

const userController = require(`../controllers/user_controller`);
const { authorize } = require('../controllers/auth_contoller');
const { IsAdmin } = require("../middlewares/role_validation");



router.post("/add",  userController.addUser);
router.put("/upd/:id", userController.editUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.delete("/del/:id", userController.deleteUser);

module.exports = router;
