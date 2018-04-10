const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const budgetController = require('../controllers/budgetController');
const userController = require('../controllers/userController');

const { authenticate } = require('../middleware/authenticate');

// Index App route
router.get('/', authenticate, budgetController.index);

// Login related routes
router.get('/login', authController.loginForm);
router.post('/login', authController.login);
router.post('/createuser', userController.createUser);
router.get('/logout', authenticate, authController.logout);

module.exports = router;
