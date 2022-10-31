const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: 'Project must have a name',
        minlength: 1,
        maxlength: 20,
        trim: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    location: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
        trim: true,
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 200,
        trim: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

const Project = model('Project', projectSchema);

module.exports = Project;