onst express = require("express");
const router = express.Router();

const {
    getElections,
    getElectionById,
    createElection,
    voteInElection,
} = require("../controllers/electionController");

const authMiddleware = require("../middlewares/authMiddleware");

// Get all elections
router.get("/", getElections);

// Get single election
router.get("/:id", getElectionById);

// Create election (protect this further with an admin check if you have one)
router.post("/create", authMiddleware, createElection);

// Vote within an election
router.post("/:id/vote", authMiddleware, voteInElection);

module.exports = router;
