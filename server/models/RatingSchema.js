// import mongoose
let mongoose = require('mongoose');
// define Schema
let Schema = mongoose.Schema;

// define Rating Model with required properties
let RatingSchema = new Schema(
    {
        title : { type : String, required : true },
        yearReleased : { type : Number, required : true },
        rating : { type : Number, required : true },
        review : { type : String, required : true },
        author : { type : String, required : true }
    }
);

// define collection as rating200430 in mongo atlas from Rating Schema
module.exports = mongoose.model('rating200430', RatingSchema);