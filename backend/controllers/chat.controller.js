const ChatsDB = require("../database/chat.database");

const createChat = async (req, res) => {
    const { sender, reciever } = req.body;
    try {
        // check if chat already exists
        const foundChat = await ChatsDB.findOne({
            members: {
                $all: [sender, reciever],
            },
        });

        console.log(foundChat);
        if (foundChat) {
            return res.status(200).json({
                success: true,
                message: "Chat Found",
                chat: foundChat,
            });
        }

        // if not found, create a new chat
        const newChat = await ChatsDB.create({
            members: [sender, reciever],
        });

        console.log(newChat);

        return res.status(200).json({
            success: true,
            message: "Chat Created",
            chat: newChat,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};

const findChatsOfUser = async (req, res) => {
    // get userId
    const userId = req.params.userId;

    try {
        // Find all chats where user is member
        const chats = await ChatsDB.find({
            members: { $in: [userId] },
        });
        return res.status(200).json({
            success: true,
            message: "Chats Found",
            chats: chats,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};

const findChatByMembers = async (req, res) => {
    const { sender, reciever } = req.params;

    try {
        // check if chat already exists
        const foundChat = await ChatsDB.findOne({
            members: {
                $all: [sender, reciever],
            },
        });

        console.log(foundChat);
        if (foundChat) {
            return res.status(200).json({
                success: true,
                message: "Chat Found",
                chat: foundChat,
            });
        } else {
            return res.status(200).json({
                success: false,
                message: "Chat does not exist",
                chat: foundChat,
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};

const findChatById = async (req, res) => {
    const { chatId } = req.params;

    try {
        // check if chat already exists
        const foundChat = await ChatsDB.findById(chatId);

        console.log(foundChat);
        if (foundChat) {
            return res.status(200).json({
                success: true,
                message: "Chat Found",
                chat: foundChat,
            });
        } else {
            return res.status(200).json({
                success: false,
                message: "Chat does not exist",
                chat: foundChat,
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};

module.exports = {
    createChat,
    findChatsOfUser,
    findChatByMembers,
    findChatById,
};
