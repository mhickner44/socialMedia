const asyncHandler = require("express-async-handler");
const profileModel = require('../models/profile')
const userModel = require("../models/user")

exports.profile = asyncHandler(async (req, res, next) => {
    try {

        let yourProfile = await profileModel.find({ user: req.userData.currentUser._id })
        let currentUser = await userModel.findById(req.userData.currentUser._id)


        let profileInfo = {
            profilePic: yourProfile[0].picture,
            username: currentUser.username,
            posts: yourProfile[0].posts,
            postTotal: yourProfile[0].posts.length,
            friendTotal: yourProfile[0].friends.length

        }
        res.json(profileInfo)
    } catch {
        res.json("getting profile error");
    }

});



exports.userProfile = asyncHandler(async (req, res, next) => {
    //usersname changed to object id 
    let username = req.body.username

    try {

        let user = await userModel.find({ 'username': username })
    
        userID = user[0]._id.toHexString()

        let profile = await profileModel.find({ 'user': userID })

        profile = profile[0]
        
        let profileInfo = {
            profilePic: profile.picture,
            username: username,
            posts: profile.posts,
            postTotal: profile.posts.length,
            friendTotal: profile.friends.length
        }
        
        res.json(profileInfo)
    } catch {
        res.json("went wrong")
    }

});