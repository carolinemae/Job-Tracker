const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const timesheetSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    employee: {
        type: String,
        required: true,
        trim: true,
    },
});

const Timesheet = model('Timesheet', timesheetSchema);

module.exports = Timesheet;
