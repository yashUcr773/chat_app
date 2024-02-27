const { CONSTANTS } = require("./config/constants.config");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = CONSTANTS.PORT || 3000;
const cookieParser = require("cookie-parser");
const connectDB = require("./database/databaseConnection");
const mongoose = require("mongoose");
const {
    credentials,
} = require("./middleware/access-control-credentials.middleware");
const socketIO = require("socket.io");
const { allowedOrigins } = require("./config/allowedOrigins");

// connect to mongodb
connectDB();

// Set allow credentials to true to send cookie
app.use(credentials);

// Cross-Origin Resource Sharing
app.use((req, res, next) => {
    if (req.path === "/") {
        // Allow all origins for the root path
        cors()(req, res, next);
    } else {
        // Use CORS with options for other routes
        cors(corsOptions)(req, res, next);
    }
});

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// to parse cookies sent with request
app.use(cookieParser());

// routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/api/v1/users", require("./routes/api/v1/users.routes"));
app.use("/api/v1/chats", require("./routes/api/v1/chats.routes"));
app.use("/api/v1/messages", require("./routes/api/v1/messages.routes"));

app.use("/", (req, res) => {
    return res.redirect(CONSTANTS.FEURL);
});

// global router catcher
app.all("*", (req, res) => {
    return res.redirect(CONSTANTS.NOTFOUND);
});

mongoose.connection.once("open", () => {
    const server = app.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
    );

    const io = socketIO(server, {
        cors: {
            origin: allowedOrigins,
        },
    });

    let onlineUsers = [];

    // Define Socket.IO event handlers
    io.on("connection", (socket) => {
        socket.on("addNewUser", (userId) => {
            let existingUsers = onlineUsers.some(
                (user) => user.userId === userId
            );
            if (!existingUsers) {
                onlineUsers.push({ userId, socketId: socket.id });
            }
            io.emit("getOnlineUsers", onlineUsers);
        });

        socket.on("disconnect", (reason) => {
            onlineUsers = onlineUsers.filter(
                (user) => user.socketId != socket.id
            );
            io.emit("getOnlineUsers", onlineUsers);
        });

        socket.on("askForOnlineUsers", () => {
            io.emit("getOnlineUsers", onlineUsers);
        });

        socket.on(
            "sendMessage",
            ({ senderId, message, receiverId, chatId }) => {
                const receiver = onlineUsers.filter(
                    (users) => users.userId === receiverId
                );
                if (receiver.length == 0) return;

                io.to(receiver[0].socketId).emit("getMessage", message);
                io.to(receiver[0].socketId).emit("getNotifications", {
                    senderId,
                    chatId,
                    isRead: false,
                    date: new Date(),
                });
            }
        );
    });
});
