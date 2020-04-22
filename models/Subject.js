const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    
    email2: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
    

});

const Subject = mongoose.model('Subject', SubjectSchema);
module.exports = Subject;