const mongoose = require('mongoose')
require("dotenv").config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    } catch (e) {
        console.log(e)
    }
}

module.exports = connectDB