const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
