const UserDB = require("../database/user.database");

async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const user = await UserDB.findById(id, { password: 0 });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
                user,
            });
        }
        res.status(200).json({
            success: true,
            message: "User found",
            user,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

async function getUsers(req, res) {
    try {
        const users = await UserDB.find({}, { password: 0 });
        res.status(200).json({
            success: true,
            message: "Users found",
            users,
        });
    } catch (e) {
        console.log(e);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

async function getUserByFilter(req, res) {
    try {
        const mask = req.query.mask || "";
        const regexFilter = new RegExp(mask, "i");
        const users = await UserDB.find(
            {
                $or: [
                    { firstname: { $regex: regexFilter } },
                    { lastname: { $regex: regexFilter } },
                ],
            },
            { firstname: 1, lastname: 1, _id: 1 }
        );

        res.status(200).json({
            success: true,
            message: "Users found",
            users,
        });
    } catch (e) {
        console.log(e);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    getUserById,
    getUsers,
    getUserByFilter,
};
