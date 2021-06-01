const express = require("express");
const router = express.Router();
const users = require("../controllers/users");


router.get("/", users.getUsers);
router.get("/:id", users.userPage);
router.get("/all", users.getUsers);

router.post("/upload", users.upload);

module.exports = router