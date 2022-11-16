const { getmesssages } = require("../controllers/userscontrollers");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.get("/messages", getmesssages);
module.exports = router;
