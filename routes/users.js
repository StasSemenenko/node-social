const express = require("express");
const router = express.Router();
const users = require("../controllers/users");


router.get("/", users.getUsers);
router.get("/:id", users.userPage);


router.get("/all", users.getUsers);

module.exports = router