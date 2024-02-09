
const asyncHandler = require("express-async-handler");
const user = require("../models/user")
const jwt =require('jsonwebtoken')

exports.login = asyncHandler(async (req, res, next) => {
    //verify that the user info is correct 
console.log(req.body.username)
    let currentUser = await user.findOne({ "username": req.body.username })

    //if no user found 
    if (currentUser == null) {
        res.json("who do you know here")

    } else {
        if (currentUser.password == req.body.password) {
<<<<<<< Updated upstream
           
            jwt.sign({currentUser}, 'secretkey',  (err, token) => {
                res.json("Heres your token " +token);
              });
=======
            res.json("youve logged in")

>>>>>>> Stashed changes
        } else {
            res.json("WRONG")
        }
    }
<<<<<<< Updated upstream
   
=======
    
    //give a token it is correct

    // jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    //     res.json({
    //       token
    //     });
    //   });
>>>>>>> Stashed changes
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
            res.send("user created");
        } catch (err) {
            return next(err);
        };
    } else {
        res.send("username is taken");
    }

})
