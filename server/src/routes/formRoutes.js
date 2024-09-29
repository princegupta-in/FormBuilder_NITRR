const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Create a new form
router.post('/', formController.createForm);

// Get all forms
router.get('/', formController.getForms);

// Get a form by ID
router.get('/:id', formController.getFormById);

// Update a form
router.put('/:id', formController.updateForm);

// Delete a form
router.delete('/:id', formController.deleteForm);

module.exports = router;
