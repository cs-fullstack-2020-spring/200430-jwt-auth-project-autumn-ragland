// import express
let express = require('express');
// create router
let router = express.Router();
// json middleware
router.use(express.json());

// json web token module
let jwt = require('jsonwebtoken');
// encryption module
let bcrypt = require('bcryptjs');
// secret from keys file
let secretKey = require('../config/keys').secretKey

// mongo collections
let UserCollection = require('../models/UserSchema');
let RatingCollection = require('../models/RatingSchema');

// test route
router.get('/', (req,res) => {
    res.send(`Success`);
});

router.post('/register', (req, res) => {
    // res.send("Register");
    // check that email does not already exist in database
    UserCollection.findOne({ email: req.body.email })
        .then((user) => {
            // if email already exists in database
            if (user) {
                // send `already exists` message
                res.json({error : `User with ${req.body.email} already exists`});
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
                            console.log("Password has not been hashed")
                            res.status(500).json({error : error});
                        }
                        // if hash does not have errors
                        else {
                            // set password of new user to hashed password
                            newUser.password = hash
                            // save new user
                            newUser.save()
                                // and send new user
                                .then(user => res.json(user));
                        }
                    });
                })
            }
        });
});

router.post('/login', (req, res) => {
    // res.send("Login");
    // check that email exists in the database
    UserCollection.findOne({ email: req.body.email })
        .then(user => {
            // if email does not exist send 403 message
            if (!user) {
                res.status(403).json({error : `User with email ${req.body.email} not found`})
            }
            // if user does exist
            else {
                // compare password passed in request body with hashed password in database
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        // if passwords match
                        if (isMatch) {
                            // define payload with id and name properties from database
                            let payload = {
                                id: user._id,
                                name: user.name,
                                email : user.email
                            }
                            // create JWT using `sign()` method passing in payload
                            jwt.sign(payload, secretKey, { expiresIn: 120 }, (error, token) => {
                                // if errors send errors, otherwise send token as object
                                error ? res.status(403).json({error : error}) : res.json({ token: `Bearer ${token}`});
                            });
                        }
                        // if passwords don't match send 403 message
                        else {
                            res.status(403).json({error : `User with email ${req.body.email} has incorrect password`});
                        }
                    });
            }
        });
});

// get all ratings
router.get('/ratings' ,(req,res) => {
    RatingCollection.find(
        {}, (error, result) => {
            error ? res.send(error) : res.send(result)
        }
    );
});

// get ratings by user email
router.get('/user/ratings', authenticateToken ,(req,res) => {
    RatingCollection.find(
        {author : req.user.email}, (error, result) => {
            error ? res.send(error) : res.json({result : result, user : req.user})
        }
    );
});

// create a rating
router.post('/rating', authenticateToken ,(req,res) => {
    RatingCollection.create(req.body, (error, results) => {
        error ? res.send(error) : res.json({result : results, user : req.user})
    });
});

// authorize route middle ware
function authenticateToken(req, res, next) {
    let bearerHeader = req.headers["authorization"];
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let bearerToken = bearer[1];
        req.token = bearerToken;
        // console.log(req.token);
        jwt.verify(req.token, secretKey, (errors, results) => {
            if(errors) {
                res.status(403).json({error : errors});
            } else {
                req.user = results;
                next();
            }
        });
    } else {
        res.status(403).json({error : "Forbidden"});
    }
}

// verify and decrypt token
router.post('/token', verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (errors, results) => {
        errors ? res.status(500).json({error : errors }) : res.json({message : results});
    });
});
// pull out token middleware
function verifyToken(req,res,next){
    let bearerHeader = req.headers["authorization"];
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403).json({error : "Forbidden"});
    }
}

module.exports = router;