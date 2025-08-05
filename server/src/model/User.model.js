const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    userName: {
        type: String
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    }
});

const User = mongoose.model("User", UserModel);

module.exports = User;
