const { signup, login, getusers } = require("../controllers/userscontrollers");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", getusers);

module.exports = router;
