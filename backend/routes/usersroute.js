const { signup, login, getusers } = require("../controllers/userscontrollers");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", auth, getusers);

module.exports = router;
