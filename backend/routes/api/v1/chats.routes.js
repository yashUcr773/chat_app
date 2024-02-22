const express = require("express");
const router = express.Router();
const chatController = require("../../../controllers/chat.controller");
const { verifyJWT } = require("../../../middleware/verifyJWT");

router.use(verifyJWT);
router.post("/create", chatController.createChat);
router.get("/user/:userId", chatController.findChatsOfUser);
router.get("/:sender/:reciever", chatController.findChatByMembers);
router.get("/:chatId", chatController.findChatById);

module.exports = router;
