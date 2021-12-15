const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema(
    {
        title:{type:String, required:true},
        name:{type:String, required:true},
        mark:{type:String, required:true},
        barcode:{type:String, default:null},
        desc:{type:String, required:true},
        img:{type:String, required:true},
        categories:{type:Array},
        size:{type:String},
        color:{type:String},
        unitPrice:{type:Number, required:true},
        decrease:{type:Number, required:true},
        finalPrice:{type:Number, required:true},
        unitsInStock:{type:Number, required:true},
    },
    {timestamps:true}
)

module.exports = mongoose.model("Product", ProductSchema);