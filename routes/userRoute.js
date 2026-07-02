const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");

const {
    uploadProfileImage,
    getUsers,
    getUserById,
    deleteUser,
} = require("../controllers/userController");

router.put("/upload/:id", upload.single("image"), uploadProfileImage);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.delete("/:id", deleteUser);

module.exports = router;