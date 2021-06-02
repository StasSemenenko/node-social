const express = require("express");
const router = express.Router();
const profile = require("../controllers/profile");
const login = require("../middleware/login");
const fileUpload = require("../middleware/file");


router.get("/edit", login, profile.profileEditPage);

router.post("/photo", fileUpload, login, profile.editPhotoProfile);
router.post("/edit", login, profile.changeProfile);


module.exports = router;