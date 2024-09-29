const FormResponse = require('../models/FormResponse');

// Store form responses
exports.storeFormResponse = async (req, res) => {
    try {
        const { formId, responses } = req.body;
        const newResponse = new FormResponse({
            formId,
            responses: responses.map((response) => ({
                questionId: response.questionId,
                answer: response.answer,
            })),
        });
        const savedResponse = await newResponse.save();
        res.status(201).json(savedResponse);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all responses for a form
exports.getFormResponses = async (req, res) => {
    try {
        const { formId } = req.params;
        const responses = await FormResponse.find({ formId }).populate('formId', 'title description');
        res.status(200).json(responses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
