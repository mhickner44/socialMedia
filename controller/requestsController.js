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
//you and other user changing their freind status
     await profileModel.findOneAndUpdate({ "user": req.body.friendedUser }, { "$push": { requests: req.userData.currentUser._id } })

    

    res.json("done")
})




//create posts
exports.confirmFriend = asyncHandler(async (req, res, next) => {
// requires users object id

    try {
        //pulling from requests and placing it into the friends
        await profileModel.findOneAndUpdate({ "user": req.userData.currentUser._id }, { "$pull": { requests: req.body.addFriend } })
        await profileModel.findOneAndUpdate({ "user": req.userData.currentUser._id }, { "$push": { friends: req.body.addFriend } })
        //switching it to friends on both sides. 
        await profileModel.findOneAndUpdate({ "user":  req.body.addFriend}, { "$push": { friends: req.userData.currentUser._id  } })
        res.json("done")
    } catch (err) {
        res.json("failed to like person")
    }


});


