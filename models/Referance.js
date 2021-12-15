const mongoose = require('mongoose');

const ReferanceSchema = new mongoose.Schema(
    {
        name:{type: String, required: true},
        filePath:{type: String, required: true},
    }, 
    {timestamps:true}
    );

module.exports = mongoose.model("Referance", ReferanceSchema);
