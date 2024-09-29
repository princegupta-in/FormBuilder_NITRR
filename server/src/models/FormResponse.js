const mongoose = require('mongoose');
const { Schema } = mongoose;

const responseSchema = new Schema({
    formId: {
        type: Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    },
    responses: [
        {
            questionId: {
                type: Schema.Types.ObjectId,
                required: true
            },
            answer: {
                type: Schema.Types.Mixed, // Allows both string and array of strings
                required: true
            }
        }
    ]
});

const FormResponse = mongoose.model('FormResponse', responseSchema);

module.exports = FormResponse;
