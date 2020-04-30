let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema(
    {
        name : { type : String, required : true },
        password : { type : String, required : true },
        email : { type : String, required : true },
        date : { type : Date, default : Date.now}
    }
);

module.exports = mongoose.model('users200430', UserSchema);