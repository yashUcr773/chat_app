const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
    {
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        lastMessageId: {
            type: Schema.Types.ObjectId,
            ref: "Messages",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
