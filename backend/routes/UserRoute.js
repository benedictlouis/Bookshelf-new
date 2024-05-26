const express = require('express');
const { registerUser, loginUser, getUser, getAllUsers } = require('../controllers/UserController');

const router = express.Router();

router.post('/register', registerUser); // Route to register a new user
router.post('/login', loginUser);       // Route to login a user
router.get('/:id', getUser);            // Route to get a user by ID
router.get('/', getAllUsers);           // Route to get all users

module.exports = router;
