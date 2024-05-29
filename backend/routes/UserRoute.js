const express = require('express');
const { registerUser, loginUser, getUser, getAllUsers } = require('../controllers/UserController');

const router = express.Router();

router.post('/register', registerUser); 
router.post('/login', loginUser);  
router.get('/:id', getUser);          
router.get('/', getAllUsers);         

module.exports = router;
