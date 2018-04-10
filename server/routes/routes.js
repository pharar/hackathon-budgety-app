const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const budgetController = require('../controllers/budgetController');

// Index App route
router.get('/', budgetController.index);

// Login related routes
router.get('/login', authController.loginForm);
router.post('/login', authController.login);

module.exports = router;
