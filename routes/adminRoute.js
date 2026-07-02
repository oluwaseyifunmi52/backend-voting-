const express = require("express");
const router = express.Router();

const {
    getDashboardStats,
    getAllUsers,
    getAllCandidates,
    deleteCandidate,
    deleteUser,
    getResults
} = require("../controllers/adminController");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// protect all admin routes
router.use(authMiddleware);
router.use(adminMiddleware);

// dashboard
router.get("/dashboard", getDashboardStats);

// users
router.get("/users", getAllUsers);
router.delete("/user/:id", deleteUser);

// candidates
router.get("/candidates", getAllCandidates);
router.delete("/candidate/:id", deleteCandidate);

// results
router.get("/results", getResults);

module.exports = router;