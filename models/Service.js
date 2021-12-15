const mongoose = require('mongoose');


const ServiceSchema = new mongoose.Schema(
    {
        customerFullName:{type:String, required:true},
        phonenum:{type:String, required:true},
        desc:{type:String, required:true},
        user_id:{type:String, required:true}
    },
    {timestamps:true}
);


module.exports = mongoose.model("Service", ServiceSchema);