const mongoose = require('mongoose');

const schemaTask = mongoose.Schema({
    name: String,
    status: String,
    done: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

// Cach 1: 
// Dung de export chi 1 ham, class,...
module.exports = new mongoose.model('task', schemaTask);
// return exports = Model {task}

//Cach 2: 
// Dung de export nhieu ham, class cung 1 luc
// exports.Task1 = new mongoose.model('task', schemaTask)
// exports.Example = new mongoose.model('example', schemaExemple)
// return exports = {Task: Model {task},  Example: ...}

// Cach 3: 
// Cung de export nhieu ham, class cung 1 luc nhung dung module.exports
// module.exports = { Example: new mongoose.model('task', schemaTask),
//                    Task: new mongoose.model('task', schemaTask) }
// return exports = {Task: Model {task}, Example: ...}