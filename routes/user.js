const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

router.get("/", user.getUser)

router.get("/all", user.getUser);

module.exports = router