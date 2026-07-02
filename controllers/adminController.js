const User = require("../models/userModel");
const Candidate = require("../models/candidateModel");
const Vote = require("../models/voteModel");


//  Get dashboard summary
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalCandidates = await Candidate.countDocuments();
        const totalVotes = await Vote.countDocuments();

        res.status(200).json({
            totalUsers,
            totalCandidates,
            totalVotes,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching dashboard stats",
            error: error.message,
        });
    }
};


//  Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message,
        });
    }
};


//  Get all candidates
const getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching candidates",
            error: error.message,
        });
    }
};


//  Delete candidate
const deleteCandidate = async (req, res) => {
    try {
        const { id } = req.params;

        const candidate = await Candidate.findByIdAndDelete(id);

        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        res.status(200).json({ message: "Candidate deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting candidate",
            error: error.message,
        });
    }
};


//  Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error: error.message,
        });
    }
};


//  Get votes summary per candidate
const getResults = async (req, res) => {
    try {
        const results = await Vote.aggregate([
            {
                $group: {
                    _id: "$candidate",
                    totalVotes: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: "candidates",
                    localField: "_id",
                    foreignField: "_id",
                    as: "candidate",
                },
            },
            {
                $unwind: "$candidate",
            },
            {
                $project: {
                    _id: 0,
                    candidateId: "$candidate._id",
                    name: "$candidate.name",
                    totalVotes: 1,
                },
            },
        ]);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching results",
            error: error.message,
        });
    }
};

module.exports = {
    getDashboardStats,
    getAllUsers,
    getAllCandidates,
    deleteCandidate,
    deleteUser,
    getResults,
};