const Candidate = require("../models/candidateModel");

// Create Candidate
const createCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.create(req.body);

        res.status(201).json(candidate);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Candidates
const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();

        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Candidate By ID
const getCandidateById = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);

        if (!candidate) {
            return res.status(404).json({
                message: "Candidate not found",
            });
        }

        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Candidate
const deleteCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);

        if (!candidate) {
            return res.status(404).json({
                message: "Candidate not found",
            });
        }

        res.status(200).json({
            message: "Candidate deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createCandidate,
    getCandidates,
    getCandidateById,
    deleteCandidate,
};