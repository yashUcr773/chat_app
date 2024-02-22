const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messagesSchema = new Schema(
    {
        chatId: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
            required: true,
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Messages", messagesSchema);
