const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const bcrypt = require('bcrypt');

const employeeSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
    },
    phone: {
        type: String,
        trim: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    admin: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: true,
    },
    address: {
        street: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        postcode: {
            type: String,
            trim: true,
        },
    },
    emergencyContact: {
        emergencyName: {
            type: String,
            trim: true,
        },
        emergencyPhone: {
            type: String,
            trim: true,
        },
    },
    timesheets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Timesheet',
        },
    ],
});

employeeSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

employeeSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const Employee = model('Employee', employeeSchema);

module.exports = Employee;
