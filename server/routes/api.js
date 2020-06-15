// import express
let express = require('express');
// define router
let router = express.Router();
// json middleware
router.use(express.json());

// json web token module
let jwt = require('jsonwebtoken');
// encryption module
let bcrypt = require('bcryptjs');
// encryption key from keys file
let secretKey = require('../config/keys').secretKey;

// mongo collections
let UserCollection = require('../models/UserSchema');
let RatingCollection = require('../models/RatingSchema');

// // test route
// router.get('/', (req,res) => {
//     res.send(`Success`);
// });

// create new user in collection
router.post('/register', (req, res) => {
    // res.send("Register"); // check endpoint
    // check that email does not already exist in database
    UserCollection.findOne({ email: req.body.email })
        .then((user) => {
            // if email already exists in database
            if (user) {
                // send `already exists` message
                res.json({error : `User with email ${req.body.email} already exists`});
            }
            // if user does not already exist in database
            else {
                // define new user from User Model
                let newUser = new UserCollection({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                // encrypt password
                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        // If hash has errors send error message
                        if (error) {
                            res.status(500).json({error : error});
                        }
                        // if hash does not have errors
                        else {
                            // set password of new user to hashed password
                            newUser.password = hash;
                            // save new user
                            newUser.save()
                                // and send new user as response
                                .then(user => res.json({user : user}));
                        }
                    });
                })
            }
        });
});

// create jwt for user from collection
router.post('/login', (req, res) => {
    // res.send("Login"); // check endpoint
    // check that email exists in the database
    UserCollection.findOne({ email: req.body.email })
        .then(user => {
            // if email does not exist send error message
            if (!user) {
                res.status(404).json({error : `User with email ${req.body.email} not found`});
            }
            // if user does exist
            else {
                // compare password passed in request body with hashed password in database
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        // if passwords match
                        if (isMatch) {
                            // define payload with id name and email properties from database
                            let payload = {
                                id: user._id,
                                name: user.name,
                                email : user.email
                            }
                            // create JWT using `sign()` method passing in payload
                            jwt.sign(payload, secretKey, { expiresIn: 300 }, (error, token) => {
                                // if errors send errors, otherwise send token as object
                                error ? res.status(403).json({error : error}) : res.json({ token: `Bearer ${token}`});
                            });
                        }
                        // if passwords don't match send 404 message
                        else {
                            res.status(404).json({error : `User with email ${req.body.email} has incorrect password`});
                        }
                    });
            }
        });
});

// get all ratings
router.get('/ratings', (req,res) => {
    // res.send("All Ratings") // check endpoint
    // find all ratings from collection
    RatingCollection.find(
        {}, (error, result) => {
            // if error send error, otherwise send all ratings
            error ? res.send(error) : res.send(result);
        }
    );
});

// protected route to get ratings by user email
router.get('/user/ratings', authenticateToken ,(req,res) => {
    // res.send("Ratings by User Email") // check endpoint
    // filter ratings from email returned in middleware
    RatingCollection.find(
        {author : req.user.email}, (error, result) => {
            // if errors send errors, otherwise send filtered ratings
            error ? res.send(error) : res.json({result : result});
        }
    );
});

// protected route to create a rating
router.post('/rating', authenticateToken ,(req,res) => {
    // res.send("Create a rating") // check endpoint
    // add a rating to the database from the request body
    RatingCollection.create(req.body, (error, results) => {
        // if errors send errors, otherwise send created rating
        error ? res.send(error) : res.json({result : results});
    });
});

// authorize route middle ware
function authenticateToken(req, res, next) {
    // pull encrypted token from header
    let header = req.headers["authorization"];
    // if token passed in to header
    if(header){
        // pull encrypted token from bearer token
        token = header.split(' ')[1];
        // decrypt and verify token is valid
        jwt.verify(token, secretKey, (errors, results) => {
            // if errors
            if(errors) {
                // send errors
                res.status(500).json({error : errors});
            } 
            // if no errors
            else {
                // set property of request to decrypted token
                req.user = results;
                // continue with functionality of route calling middle ware
                next();
            }
        });
    } 
    // if token not passed in to header
    else {
        // send Forbidden message
        res.status(403).json({error : "Please sign in to access this page"});
    }
}

// verify and decrypt token
router.post('/token', (req, res) => {
    // pull encrypted token from headers
    let header = req.headers["authorization"];
    // if token passed in to header
    if(header){
        // pull encrypted token from bearer token
        token = header.split(' ')[1]
        // decrypt and verify token is valid
        jwt.verify(token, secretKey, (errors, results) => {
            // if errors send error, otherwise send decrypted token
            errors ? res.status(500).json({error : errors }) : res.json({user : results});
        });
    } 
    // if token not passed into header
    else {
        // send Forbidden message
        res.status(403).json({error : "Please sign in to access this page"});
    }
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;