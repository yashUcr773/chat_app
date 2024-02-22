require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const connectDB = require("./database/databaseConnection");
const mongoose = require("mongoose");
const {
    credentials,
} = require("./middleware/access-control-credentials.middleware");

// connect to mongodb
connectDB();

// set allow credentials to true to send cookie
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

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

// global router catcher
app.all("*", (req, res) => {
    res.send("Hello World!");
});

mongoose.connection.once("open", () => {
    console.log("connected to DB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
