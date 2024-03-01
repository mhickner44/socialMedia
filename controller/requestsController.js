const asyncHandler = require("express-async-handler");
const postModel = require("../models/posts")
const userModel = require("../models/user")
const profileModel = require("../models/profile")

exports.reqFriend = asyncHandler(async (req, res, next) => {

    //get the profile of the person your tring to freind 
    let filter = req.body.friendedUser;
    const update = { requests: req.userData.currentUser._id };

    console.log("user being freindined " + filter + " user trying to friend " + req.userData.currentUser._id)
    // function findOneAndUpdate(filter, update, options

    let friendsList = await profileModel.findOneAndUpdate({ "user": req.body.friendedUser }, { "$push": { requests: req.userData.currentUser._id } })


    res.json("done")
})




//create posts
exports.confirmFriend = asyncHandler(async (req, res, next) => {
// requires users object id

    try {
        await profileModel.findOneAndUpdate({ "user": req.userData.currentUser._id }, { "$pull": { requests: req.body.addFriend } })
        await profileModel.findOneAndUpdate({ "user": req.userData.currentUser._id }, { "$push": { friends: req.body.addFriend } })
        res.json("done")
    } catch (err) {
        res.json("failed to like person")
    }


});


