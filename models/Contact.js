const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
    
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

const User = mongoose.model('User', ContactSchema);
module.exports = Contact;