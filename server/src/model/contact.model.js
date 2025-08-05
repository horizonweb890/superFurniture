const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactModel = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    contact: {
        type: String
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Contact = mongoose.model("Contact", contactModel);

module.exports = Contact;
