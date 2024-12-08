const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const {auth} = require('../middlewares/Authentication');

// Create a new form
router.post('/', auth,formController.createForm);

// Get all forms
router.get('/',auth, formController.getForms);

// Get a form by ID
router.get('/:id',auth, formController.getFormById);

// Update a form
router.put('/:id',auth, formController.updateForm);

// Delete a form
router.delete('/:id',auth, formController.deleteForm);

module.exports = router;
