
const asyncHandler = require("express-async-handler");
const user = require("../models/user")
const profile = require("../models/profile")
const jwt = require("jsonwebtoken")

exports.login = asyncHandler(async (req, res, next) => {
    //verify that the user info is correct 


    let currentUser = await user.findOne({ "username": req.body.username })

    //if no user found 
    if (currentUser == null) {
        res.json("no user")

    } else {
        if (currentUser.password == req.body.password) {

            jwt.sign({ currentUser }, 'secretkey', (err, token) => {
                res.json({
                    token
                });
            });

        } else {
            res.json("WRONG")
        }
    }

    //give a token it is correct


})



exports.createUser = asyncHandler(async (req, res, next) => {


    //verify that the user info is correct 

    let userDetail = {
        username: req.body.username,
        password: req.body.password,
    }

    //check for taken username
    let existingUser = await user.findOne({ "username": req.body.username })

    if (existingUser == null) {

        //if no user found 
        try {

            let newUser = new user(userDetail);
            const result = await newUser.save();

            let userProfile = {
                posts: [],
                comments: [],
                friends: [],
                picture: "this is a new test user profile",
                user: result.id,
                requests:[]
            }
            let newProfile = new profile(userProfile);
            await newProfile.save();

            res.json("user created");
        } catch (err) {
            return next(err);
        };
    } else {
        res.json("username is taken");
    }



})
