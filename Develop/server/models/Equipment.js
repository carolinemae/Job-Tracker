const { Schema, model } = require('mongoose');

const equipmentSchema = new Schema({
    equipId: {
        type: String,
        required: true,
        trim: true
    },
    equipName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
        trim: true,
    },
});

const Equipment = model('Equipment', equipmentSchema);

module.exports = Equipment;