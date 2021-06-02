const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const login = require("../middleware/auth");


router.get("/", users.getUsers);
router.get("/:id", login, users.userPage);
router.get("/all", users.getUsers);

router.post("/upload", users.upload);


module.exports = router