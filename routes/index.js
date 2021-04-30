const express = require("express");
const router = express.Router();
const user = require("./user");
const auth = require("./auth");
const post = require("./post");
const posts_controller = require("../controllers/posts");
const login = require("../controllers/auth")

router.get("/", posts_controller.homePage);


router.use("/user", user);
router.use("/auth", auth);
router.use("/post", post);


module.exports = router