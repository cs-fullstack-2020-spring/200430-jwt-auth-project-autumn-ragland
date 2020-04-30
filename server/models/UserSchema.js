// import mongoose
let mongoose = require('mongoose');
// define Schema
let Schema = mongoose.Schema;

// define User Model with required properties
let UserSchema = new Schema(
    {
        name : { type : String, required : true },
        password : { type : String, required : true },
        email : { type : String, required : true },
        date : { type : Date, default : Date.now}
    }
);

// define collection as users200430 in mongo atlas from User Schema
module.exports = mongoose.model('users200430', UserSchema);