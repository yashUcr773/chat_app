const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.handleSignup);
router.post("/signin", authController.handleLogin);
router.get("/signout", authController.handleLogout);
router.get("/refresh", authController.handleRefreshToken);

module.exports = router;
