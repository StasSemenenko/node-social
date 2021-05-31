const express = require("express");
const router = express.Router();
const users = require("./users");
const auth = require("./auth");
const posts = require("./posts");
const profile = require("./profile");
const posts_controller = require("../controllers/posts");
const login = require("../controllers/auth");



router.get("/", posts_controller.homePage);
router.get("/404", (req, res) => res.render("404"));


router.use("/users", users);
router.use("/auth", auth);
router.use("/posts", posts);
router.use("/profile", profile);

router.get("/*", (req, res) => res.redirect("404"));

module.exports = router