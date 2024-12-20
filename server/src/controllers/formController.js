const Form = require('../models/Form');
const { Uploadmedia } = require('../utils/Mediauploader');
require("dotenv").config();

// Create a new form
exports.createForm = async (req, res) => {
    try {
        // If the adminId is passed from the request body, you can use it directly
        // Alternatively, if you have authentication middleware, you can use `req.user.id`
        const adminId = req.body.createdBy || req.user.id;

        const { title, description} = req.body;
        const questions = JSON.parse(req.body.questions);
        const bannerimage_file = req?.files?.BannerImage;

        // Ensure that the adminId is provided
        if (!adminId) {
            return res.status(400).json({ error: "Admin ID is required" });
        }
        
        let Banner_url = null;
        if(bannerimage_file)
        {
            const filedata =await  Uploadmedia(bannerimage_file,process.env.FOLDER_NAME);
            console.log("media uploaded",filedata);
            if(filedata)
            {
                Banner_url = filedata.secure_url;
            }
        }
        // Create a new form object with the adminId (createdBy)
        const newForm = new Form({
            title,
            description,
            Banner_url,
            questions,
            createdBy: adminId // adminId here
        });

        // Save the form to the database
        const form = await newForm.save();

        // Return the newly created form
        res.status(201).json(form);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Get all forms
exports.getForms = async (req, res) => {
    try {
        const forms = await Form.find();
        if (!forms.length) return res.status(404).json({ msg: 'No forms found' });
        res.json(forms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a form by ID
exports.getFormById = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).json({ msg: 'Form not found' });
        res.json(form);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a form
exports.updateForm = async (req, res) => {
    try {
        const { title, description, questions, isPublished } = req.body;
        const form = await Form.findByIdAndUpdate(
            req.params.id,
            { title, description, questions, isPublished, updatedAt: Date.now() },
            { new: true }
        );
        if (!form) return res.status(404).json({ msg: 'Form not found' });
        res.json(form);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a form
exports.deleteForm = async (req, res) => {
    try {
        const form = await Form.findByIdAndDelete(req.params.id);
        if (!form) return res.status(404).json({ msg: 'Form not found' });
        res.json({ msg: 'Form deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
