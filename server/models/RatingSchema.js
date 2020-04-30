let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RatingSchema = new Schema(
    {
        title : { type : String, required : true },
        yearReleased : { type : Number, required : true },
        rating : { type : Number, required : true },
        review : { type : String, required : true },
        author : { type : String, required : true }
    }
);

module.exports = mongoose.model('rating200430', RatingSchema);