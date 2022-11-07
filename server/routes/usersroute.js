const { register } = require("../controllers/userscontrollers");

const router = require("express").Router();

router.post("/register", register);

module.exports = router;
