// import express
let express = require("express");
// define server
let app = express();

// render react when backend runs
app.use(express.static('../client/build'));
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('../client/build'));
// }

// CONNECTING TO A MONGO DB DATABASE
// reference the mongoose module 
let mongoose = require('mongoose');
// connect to database
let mongoDB = require('./config/keys').mongoURI; // mongo string from keys file
mongoose.connect(process.env.MONGODB_URI || mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
// connection error message
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => { 
    console.log('DB Connected')
});

// mount routes
let api = require("./routes/api");
app.use('/api', api);

// server listening on port
// let port = require('./config/keys').listenPort;
let port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});