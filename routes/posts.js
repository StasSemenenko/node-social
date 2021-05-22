const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts");

router.get("/", posts.homePage);
router.get("/add", posts.createPostPage);
router.get("/:id", posts.postPage);


router.post("/add", posts.createPost);
router.post("/:id/comment", posts.createComment);


module.exports = router;