const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

router.get("/signin", auth.signinPage);
router.get("/signup", auth.signupPage);
router.get("/signout", auth.signout);

router.post("/signup", auth.createAccount);


module.exports = router;