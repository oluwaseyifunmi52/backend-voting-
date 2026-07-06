const Election = require("../models/electionModel");
const Candidate = require("../models/candidateModel");
const User = require("../models/userModel");
const Vote = require("../models/voteModel");

// GET ALL ELECTIONS
exports.getElections = async (req, res) => {
    try {
        const elections = await Election.find().populate("candidates");
        res.json(elections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET SINGLE ELECTION
exports.getElectionById = async (req, res) => {
    try {
        const election = await Election.findById(req.params.id).populate("candidates");
        if (!election) {
            return res.status(404).json({ error: "Election not found" });
        }
        res.json(election);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE ELECTION (admin)
exports.createElection = async (req, res) => {
    try {
        const { title, description, startDate, endDate, isActive, candidates } = req.body;

        const election = await Election.create({
            title,
            description,
            startDate,
            endDate,
            isActive,
            candidates,
            createdBy: req.user?.id,
        });

        res.status(201).json(election);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// VOTE WITHIN AN ELECTION
exports.voteInElection = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id: electionId } = req.params;
        const { candidateId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.hasVoted) {
            return res.status(400).json({ error: "You have already voted" });
        }

        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({ error: "Election not found" });
        }

        const candidateBelongs = election.candidates.some(
            (c) => c.toString() === candidateId
        );
        if (!candidateBelongs) {
            return res.status(400).json({ error: "Candidate is not part of this election" });
        }

        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ error: "Candidate not found" });
        }

        const vote = await Vote.create({
            user: userId,        // matches voteModel's "user" field (not "voter")
            candidate: candidateId,
        });

        candidate.votes = (candidate.votes || 0) + 1;
        await candidate.save();

        user.hasVoted = true;
        await user.save();

        res.status(201).json({
            message: "Your vote has been recorded successfully",
            vote,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};