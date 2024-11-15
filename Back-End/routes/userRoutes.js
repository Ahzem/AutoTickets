// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// Auth routes
router.post("/register", register);
router.post("/login", login);

// Protected user routes
router.get("/profile", auth, userController.getProfile);
router.patch("/profile", auth, userController.updateProfile);
router.delete("/profile", auth, userController.deleteProfile);
router.post("/change-password", auth, userController.changePassword);

// Admin routes
router.get("/users", auth, userController.getAllUsers);
router.get("/users/:id", auth, userController.getUserById);

module.exports = router;
