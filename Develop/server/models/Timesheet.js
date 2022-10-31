const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const timesheetSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    startTime: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    lunchStart: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    lunchEnd: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    endTime: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    employee_id: {
        type: String,
        required: true,
        references: {
            model: 'employee',
            key: '_id',
        },
    },
});

const Timesheet = model('Timesheet', timesheetSchema);

module.exports = Timesheet;
