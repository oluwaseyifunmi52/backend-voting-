const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidate",
            required: true,
        },
    },
    { timestamps: true }
);

voteSchema.index({ user: 1, candidate: 1 }, { unique: true });

module.exports = mongoose.models.Vote || mongoose.model("Vote", voteSchema);