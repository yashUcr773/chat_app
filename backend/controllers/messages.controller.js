const MessagesDB = require("../database/messages.database");
const ChatsDB = require("../database/chat.database");

const createMessage = async (req, res) => {
    try {
        const { message, chatId, senderId } = req.body;

        const createdMessage = await MessagesDB.create({
            message,
            chatId,
            senderId,
        });

        const updatedChat = await ChatsDB.findByIdAndUpdate(
            chatId,
            {
                lastMessageId: createdMessage._id,
            },
            { new: true }
        );


        return res.status(200).json({
            success: true,
            message: "Message Sent",
            createdMessage,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};

const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;

        const messages = await MessagesDB.find({ chatId });

        return res.status(200).json({
            success: true,
            message: "Messages found",
            messages,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};

module.exports = {
    getMessages,
    createMessage,
};
