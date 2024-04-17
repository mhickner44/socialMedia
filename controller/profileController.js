const asyncHandler = require("express-async-handler");
const profileModel = require('../models/profile')
const userModel = require("../models/user")

exports.profile = asyncHandler(async (req, res, next) => {
    let currentFriend = false;
    let userID;
    let user;
    let givenUser = req.headers.user
    let pendingReq = false
    let reqType = false;

    try {
        //another user 
       
        user = await userModel.find({ 'username': givenUser })

        let yourProfile = await profileModel.find({ user: req.userData.currentUser._id })

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

        //checking requests to see if you have one pending
        if (reqProfile[0].requests != undefined) {

            reqProfile[0].requests.forEach(request => {
                request = request._id.toHexString()

                //or if its your own or just change 
                //if the current user profile im getting matches the one I got and is in my friends then it is a freind
                if (request === req.userData.currentUser._id) {
                    pendingReq = true;
                }
            });
        }


        let posts = reqProfile[0].posts

        let postCount = 0;


        if (reqProfile[0].posts == undefined) {
            posts = []
        }


        if (reqProfile[0].posts != undefined) {

            postCount = reqProfile[0].posts.length
        }


        let guestInfo = {
            profilePic: reqProfile[0].profilePic,
            username: user.username,
            posts: posts,
            postTotal: postCount,
            friendTotal: postCount,
            currentFriend: currentFriend,
            requested: pendingReq,
            reqType: reqType,
            userID: userID,

        }

        res.json(guestInfo)


    } catch {
        res.json("getting profile error");
    }

});


exports.myProfile = asyncHandler(async (req, res, next) => {
    let currentFriend = false;
    let reqType = false;

    try {

        //your own profile

        let currentUser = await userModel.findById(req.userData.currentUser._id)
        //change currentFriend status to something that marks it as your own?
        let yourProfile = await profileModel.find({ user: req.userData.currentUser._id })


        console.log("i ran in your own user profile")

        let posts;

        let postCount = 0;

        if (yourProfile[0].posts == undefined) {
            posts = []
        }


        if (yourProfile[0].posts != undefined) {

            postCount = yourProfile[0].posts.length
        }

        let profileInfo = {
            profilePic: yourProfile[0].profilePic,
            username: currentUser.username,
            posts: posts,
            postTotal: postCount,
            friendTotal: yourProfile[0].friends.length,
            currentFriend: currentFriend,
            reqType: reqType,
            userID: req.userData.currentUser._id
        }

        res.json(profileInfo)

        //if it is just your profile

    } catch {
        res.json("getting profile error");
    }

});


