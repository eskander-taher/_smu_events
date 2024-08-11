const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Adjust the path as necessary
const authMiddleware = require("../middleware/authMiddleware");

// User login route
router.post("/login", authController.loginUser);

// User registration route
router.post("/register", authController.registerUser);

// Author registration route
router.post("/register/author", authController.registerAuthor);

// Mod registration route
router.post("/register/mod", authController.registerMod);

// Email verification route
router.get("/verify-email", authController.verifyByEmail);

// Mod registration route
router.put("/verify-mod/:id", authController.verifyByAdmin);

// Delete user
router.delete("/users/:id", authController.deleteUser);

// Get all users route
router.get("/users", authController.getAllUsers);
router.get("/users/mods", authMiddleware("админ"), authController.getAllMods);
router.get("/users/authors", authController.getAllAuthors);
router.get("/users/:id", authController.getUserById);

// Delete all users route
router.delete("/users", authController.deleteAllUsers);


module.exports = router;
