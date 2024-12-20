const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: String,
    subject: String,
    path: String,
    uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
