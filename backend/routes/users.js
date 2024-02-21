const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyJWT } = require("../middleware/verifyJWT");

router.get("/:id", verifyJWT, userController.getUserById);

router.get("/", verifyJWT, userController.getUsers);

module.exports = router;