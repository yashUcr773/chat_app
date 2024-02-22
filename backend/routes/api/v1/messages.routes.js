const express = require("express");
const router = express.Router();
const messagesController = require("../../../controllers/messages.controller");
const { verifyJWT } = require("../../../middleware/verifyJWT");

router.use(verifyJWT);

router.get("/:chatId", messagesController.getMessages);
router.post("/create", messagesController.createMessage);

module.exports = router;
