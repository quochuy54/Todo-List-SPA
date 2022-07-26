const mongoose = require('mongoose');

const schemaTask = mongoose.Schema({
    name: String,
    status: String
}, {timestamps: true});


module.exports = new mongoose.model('task', schemaTask);
