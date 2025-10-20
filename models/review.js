//const { string, number } = require("joi");
const { required } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    name: {
        type: String,
        required:true,
    },
    comment: {
        type:String,
        required:true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Review",reviewSchema);