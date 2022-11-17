const {
  signup,
  login,
  getusers,
  getmesssages,
  postmesssages,
} = require("../controllers/userscontrollers");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", getusers);
router.get("/messages", getmesssages);
router.post("/messages", postmesssages);

module.exports = router;
