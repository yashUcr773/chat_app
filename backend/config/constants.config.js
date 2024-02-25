require("dotenv").config();
const CONSTANTS = {
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    FEURL: "https://chat.swiftchat.dev/",
    NOTFOUND: "https://chat.swiftchat.dev/notfound",
    PORT: process.env.PORT,
    ENV: process.env.ENV,
};

module.exports = {
    CONSTANTS,
};
