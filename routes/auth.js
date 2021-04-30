const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

router.get("/signin", auth.getAuth);

module.exports = router;