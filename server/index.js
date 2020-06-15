// import express
let express = require("express");
// define server
let app = express();

// CONNECTING TO A MONGO DB DATABASE
// reference the mongoose module 
let mongoose = require('mongoose');
// connect to database
let mongoDB = require('./config/keys').mongoURI; // mongo string from keys file
mongoose.connect(process.env.MONGODB_URI || mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
// connection error message
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// mount routes
let api = require("./routes/api");
app.use('/api', api);

if(process.env.NODE_ENV === "production"){
    app.use(express.static('../client/build'))
}

// server listening on port
let port = require('./config/keys').listenPort;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});