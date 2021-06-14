const express = require("express");
const router = express.Router();
const users = require("./users");
const auth = require("./auth");
const posts = require("./posts");
const profile = require("./profile");
const posts_controller = require("../controllers/posts");
const login = require("../controllers/auth");




router.get("/", posts_controller.homePage);
router.get("/errors", (req, res) => res.render("errors", {cose: "404"}));


router.use("/users", users);
router.use("/auth", auth);
router.use("/posts", posts);
router.use("/profile", profile);

router.get("/*", (req, res) => res.render("errors",{code: "404"}));

module.exports = router