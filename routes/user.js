const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

router.get("/", (req, res) => res.send("Hello user"));

router.get("/all", user.getUser);

module.exports = router