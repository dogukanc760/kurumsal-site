const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
    {
        fromAdres:{type: String, required: true},
        toAdres:{type: String, required: true},
        floor:{type: String, required:true},
        fullname:{type: String, required:true},
        phone:{type: String, required:true},
    },
    {timestamps:true}
    );

module.exports = mongoose.model("Contact", ContactSchema);