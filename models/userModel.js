const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    cloudinary: {
        public_id: {
            type: String,
            default: "",
        },

        url: {
            type: String,
            default: "",
        },
    },
});

module.exports = mongoose.model("User", userSchema);