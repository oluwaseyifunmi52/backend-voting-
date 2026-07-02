const Vote = require("../models/voteModel");
const User = require("../models/userModel");
const Candidate = require("../models/candidateModel");


// VOTE FOR A CANDIDATE

exports.voteCandidate = async (req, res) => {
    try {
        const userId = req.user.id;
        const { candidateId } = req.body;

        // 1. Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2. Check if user already voted
        if (user.hasVoted) {
            return res.status(400).json({ message: "You have already voted" });
        }

        // 3. Check if candidate exists
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // 4. Create vote
        const vote = await Vote.create({
            voter: userId,
            candidate: candidateId
        });

        // 5. Mark user as voted
        user.hasVoted = true;
        await user.save();

        res.status(201).json({
            message: "Vote recorded successfully",
            vote
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// GET VOTES FOR A CANDIDATE
exports.getCandidateVotes = async (req, res) => {
    try {
        const { candidateId } = req.params;

        const votes = await Vote.find({ candidate: candidateId })
            .populate("voter", "name email")
            .populate("candidate", "name party");

        const totalVotes = votes.length;

        res.json({
            candidateId,
            totalVotes,
            votes
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};