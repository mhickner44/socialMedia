const asyncHandler = require("express-async-handler");
const profileModel = require('../models/profile')
const userModel = require("../models/user")

exports.profile = asyncHandler(async (req, res, next) => {
    let userID;
    let user;
    
    try {

        //is your profile or another persons?
        if (req.headers.user != "undefined") {
            //another user 
            user = await userModel.find({ 'username': req.headers.user })
            console.log("user id " + user)

            userID = user[0]._id.toHexString()

            user = user[0]
        } else {
            //your own profile
            userID = req.userData.currentUser._id
            user = await userModel.findById(req.userData.currentUser._id)
        }

        let yourProfile = await profileModel.find({ user: userID })

        //check to see if you are friends are not 
        //loop all of the friends 
        let currentFriend=false ;
console.log("user id of current user "+  userID)
console.log( yourProfile[0].friends)

         yourProfile[0].friends.forEach(friend => {
            friend=friend._id.toHexString()
            // console.log( friend)
            // console.log(userID)
          
            if (friend === userID) {
                currentFriend = true;
            }
        });

        let profileInfo = {
            profilePic: yourProfile[0].picture,
            username: user.username,
            posts: yourProfile[0].posts,
            postTotal: yourProfile[0].posts.length,
            friendTotal: yourProfile[0].friends.length,
            currentFriend:currentFriend
        }
        res.json(profileInfo)
    } catch {
        res.json("getting profile error");
    }

});



// exports.userProfile = asyncHandler(async (req, res, next) => {
//     //usersname changed to object id 
//     let username = req.body.username

//     try {
//         console.log(username)
//         let user = await userModel.find({ 'username': username })

//         userID = user[0]._id.toHexString()

//         let profile = await profileModel.find({ 'user': userID })

//         profile = profile[0]

//         let profileInfo = {
//             profilePic: profile.picture,
//             username: username,
//             posts: profile.posts,
//             postTotal: profile.posts.length,
//             friendTotal: profile.friends.length
//         }

//         res.json(profileInfo)
//     } catch {
//         res.json("went wrong")
//     }

// });