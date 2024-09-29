const express = require('express');
const router = express.Router();
const formResponseController = require('../controllers/formResponseController');

// Store form responses
router.post('/', formResponseController.storeFormResponse);

// Get all responses for a form
router.get('/:formId', formResponseController.getFormResponses);

module.exports = router;
