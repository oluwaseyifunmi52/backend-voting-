const express = require("express");
const router = express.Router();

const {
    createCandidate,
    getCandidates,
    getCandidateById,
    deleteCandidate,
} = require("../controllers/candidateController");

// Create Candidate
router.post("/create", createCandidate);

// Get All Candidates
router.get("/", getCandidates);

// Get Candidate By ID
router.get("/:id", getCandidateById);

// Delete Candidate
router.delete("/:id", deleteCandidate);

module.exports = router;
