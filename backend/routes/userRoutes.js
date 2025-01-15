const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes existantes
router.post('/register', userController.registerUser); // Register
router.get('/', userController.getAllUsers); // Get all users

// Nouvelles routes
router.post('/login', userController.loginUser);
router.get('/:id', userController.getUser); // Get user by ID
router.put('/:id', userController.modifyUser); // Modify user
router.delete('/:id', userController.delUser); // Delete user

module.exports = router;
