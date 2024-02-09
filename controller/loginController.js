
const asyncHandler = require("express-async-handler");
const user = require("../models/user")

exports.login = asyncHandler(async (req, res, next) => {
    //verify that the user info is correct 

    
    let currentUser = await user.findOne({ "username": req.body.username })

    //if no user found 
    if (currentUser == null) {
        res.json("who do you know here")

    } else {
        if (currentUser.password == req.body.password) {
            res.json("youve logged in")

        } else {
            res.json("WRONG")
        }
    }
    
    //give a token it is correct

    // jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    //     res.json({
    //       token
    //     });
    //   });
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
