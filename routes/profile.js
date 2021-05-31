const express = require("express");
const router = express.Router();
const profile = require("../controllers/profile");

router.get("/edit", profile.profileEditPage);

router.post("/edit", profile.changeProfile);


module.exports = router;