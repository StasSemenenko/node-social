const express = require("express");
const router = express.Router();
const users = require("./users");
const auth = require("./auth");
const posts = require("./posts");
const posts_controller = require("../controllers/posts");
const login = require("../controllers/auth")

router.get("/", posts_controller.homePage);


router.use("/users", users);
router.use("/auth", auth);
router.use("/posts", posts);


module.exports = router