
const asyncHandler = require("express-async-handler");
const user = require("../models/user")
const profile=require("../models/profile")
const jwt = require("jsonwebtoken")

exports.login = asyncHandler(async (req, res, next) => {
    //verify that the user info is correct 


    let currentUser = await user.findOne({ "username": req.body.username })

    //if no user found 
    if (currentUser == null) {
        res.json("who do you know here")

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
        console.log(existingUser)
        //if no user found 
        try {
            let newUser = new user(userDetail);

            const result = await newUser.save();
            console.log(result + " " + result.id)
            let userProfile = {

                posts: [],
                comments: [],
                friends: [],
                picture: "",
                user: result.id
            }

            let newProfile = new profile(userProfile);
           let newrestul = await newProfile.save();
console.log(newrestul)
            res.json(newUser + " user created");
        } catch (err) {
            return next(err);
        };
    } else {
        res.json("username is taken");
    }

})
