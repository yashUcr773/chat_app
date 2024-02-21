const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", usersSchema);
