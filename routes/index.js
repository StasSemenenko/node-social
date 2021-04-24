const express = require("express");
const router = express.Router();
const user = require("./user");
const posts = require("../controllers/posts");

router.get("/", posts.homePage);

router.use("/user", user);

module.exports = router