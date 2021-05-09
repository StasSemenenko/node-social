const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts");

router.get("/", posts.homePage);
router.get("/add", posts.postPage);

router.post("/add", posts.createPost);


module.exports = router;