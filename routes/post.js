const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts");

router.get("/", posts.homePage);

module.exports = router;