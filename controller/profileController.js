const asyncHandler = require("express-async-handler");
const profileModel = require('../models/profile')
const userModel = require("../models/user")

exports.profile = asyncHandler(async (req, res, next) => {
    let currentFriend = false;
    let userID;
    let user;
    let givenUser = req.headers.user
    // false= your profile true = someone elses 
    let reqType = false;
    try {

        //your own profile

        let currentUser = await userModel.findById(req.userData.currentUser._id)
        //change currentFriend status to something that marks it as your own?
        let yourProfile = await profileModel.find({ user: req.userData.currentUser._id })

      
        //is your profile or another persons?
        if (givenUser != undefined) {
            //another user 
            user = await userModel.find({ 'username': givenUser })
            console.log("user id " + user)

            userID = user[0]._id.toHexString()

            user = user[0]
            reqType = true;

            //get users  profile
            let reqProfile = await profileModel.find({ user: userID })

            //setting current friend status
           
            yourProfile[0].friends.forEach(friend => {
                friend = friend._id.toHexString()
               
                //or if its your own or just change 
                //if the current user profile im getting matches the one I got and is in my friends then it is a freind
                if (friend === userID) {
                    currentFriend = true;
                }
            });

            //check to see if you are friends are not 

            let profileInfo = {
                profilePic: reqProfile[0].picture,
                username: user.username,
                posts: reqProfile[0].posts,
                postTotal: reqProfile[0].posts.length,
                friendTotal: reqProfile[0].friends.length,
                currentFriend: currentFriend,
                reqType: reqType
            }
            res.json(profileInfo)

        } else {
            let profileInfo = {
                profilePic: yourProfile[0].picture,
                username: currentUser.username,
                posts: yourProfile[0].posts,
                postTotal: yourProfile[0].posts.length,
                friendTotal: yourProfile[0].friends.length,
                currentFriend: currentFriend,
                reqType: reqType
            }

            res.json(profileInfo)
        }


        //if it is just your profile

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