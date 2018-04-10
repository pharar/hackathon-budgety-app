const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const budgetController = require('../controllers/budgetController');

// Index App route
router.get('/', budgetController.index);

// Login related routes
router.get('/login', authController.loginForm);
router.post('/login', authController.login);

// Budget CRUD
router.post('/add', budgetController.add);
router.post('/movements/:id/delete', budgetController.delete);
router.get('/movements/:type', budgetController.findByType);

module.exports = router;
