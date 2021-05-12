const express = require("express");
const router = express.Router();
const profile = require("../controllers/profile");

router.get("/", profile.profilePage);



module.exports = router;