const express = require(`express`);
const router = express();
router.use(express.json());

const { authenticate } = require(`../controllers/auth_contoller`);

router.post(`/`, authenticate);
module.exports = router;
