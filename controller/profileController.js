const asyncHandler = require("express-async-handler");
const profileModel = require('../models/profile')
const userModel = require("../models/user")

exports.profile = asyncHandler(async (req, res, next) => {
    // -profile pic
    // -username
    // -posts
    // -# of followers
    // -# of posts

    //get all of that profile info
    console.log(req.userData.currentUser._id)
    let yourProfile = await profileModel.find({ user: req.userData.currentUser._id})
    let currentUser = await userModel.findById(req.userData.currentUser._id)

    console.log(yourProfile)

    // let profileInfo = {
    //     profilePic: yourProfile[0].picture,
    //     username: currentUser.username,
    //     posts: yourProfile[0].posts,
    //     postTotal: yourProfile[0].posts.length,
    //     friendTotal: yourProfile[0].friends.length
    // }


    res.send(profileInfo)
});