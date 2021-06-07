const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts");
const login = require("../middleware/login");


router.get("/", posts.homePage);
router.get("/add", posts.createPostPage);
router.get("/:id", login, posts.postPage);
router.get("/:id/edit", login, posts.editPostPage);
router.get("/comment/:id/remove", login, posts.removeComment);
router.get("/:id/remove", login, posts.removePost);


router.post("/add", posts.createPost);
router.post("/:id/comment", login, posts.createComment);
router.post("/:id/edit", login, posts.updatePost);

module.exports = router;