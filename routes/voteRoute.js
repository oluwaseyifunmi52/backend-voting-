const express = require("express");
const router = express.Router();

const {
    voteCandidate,
    getCandidateVotes,
} = require("../controllers/voteController");

const authMiddleware = require("../middlewares/authMiddleware");

// vote route (protected)
router.post("/vote", authMiddleware, voteCandidate);

// get votes for a candidate
router.get("/candidate/:candidateId", getCandidateVotes);

module.exports = router;