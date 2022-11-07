const { register, Login } = require("../controllers/userscontrollers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", Login);

module.exports = router;
