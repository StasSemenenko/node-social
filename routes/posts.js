const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts");
const login = require("../middleware/login");
const fileUpload = require("../middleware/file");



router.get("/", posts.homePage);
router.get("/add", posts.createPostPage);
router.get("/:id", login, posts.postPage);
router.get("/:id/edit", login, posts.editPostPage);
router.get("/comment/:id/remove", login, posts.removeComment);
router.get("/:id/remove", login, posts.removePost);
router.get("/comment/:id/edit", login, posts.editCommentPage);
router.get("/:id/like", login, posts.like);



router.post("/add", login, fileUpload, posts.createPost);
router.post("/:id/comment", login, posts.createComment);
router.post("/:id/edit", login, fileUpload, posts.updatePost);
router.post("/comment/:id/edit", posts. editComment);
router.post("/search", posts.search);

module.exports = router;