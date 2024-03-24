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
        await profileModel.findOneAndUpdate({ "user": req.body.addFriend }, { "$push": { friends: req.userData.currentUser._id } })
        res.json("done")
    } catch (err) {
        res.json("failed to like person")
    }


});


exports.getPending = asyncHandler(async (req, res, next) => {

    //return your pending requests of user to display them on page. 
    try {
        //get profile 
        let yourProfile = await profileModel.find({ user: req.userData.currentUser._id })

        //get usernames as well 
        // ex  let posts=  await postModel.find( {'user':{ $in:friendsList[0].friends}} )

        let users = await userModel.find({ '_id': { $in: yourProfile[0].requests } }).select("-password")


        let response = {
            requestsID: users

        }

        res.json(response)
    } catch (err) {
        res.json("failed to get pending requests")
    }

    // return requests
});



//get users feed 

exports.getFeed = asyncHandler(async (req, res, next) => {

    try {


        let yourProfile = await profileModel.find({ user: req.userData.currentUser._id })

        let friends = yourProfile[0].friends

        let postFeed = await postModel.find({ 'user': { $in: friends } }).sort({ createdAt: -1 }).limit(5)
        //loop through the user and then exchange that section of the post iwth a username 

        let userArr = [];
        // console.log("before "+postFeed)


        postFeed.map(function (element) {
            //remove the 
            let currentUser = element.user.toHexString()

            userArr.push(currentUser)
        })

        //
        //get the usernames of each id here
        let usernames = await userModel.find({ _id: { "$in": userArr } })
        //try to toobject in a loop[ 

        //convert to a mutable object
        let newFeed = postFeed.map(function (element, index) {

            return element.toObject()
        })

    
        // let responseJSon

        newFeed.forEach(function (element, index) {
            //remove the 
            // console.log(element.user.toHexString())
            //loop through and change it for the correc tone

            let currentUser = element.user.toHexString()
            //remove the 

            usernames.forEach((e) => {


                if (currentUser == e._id.toHexString()) {
                    //replace it with the correct usernames 


                    currentUser = e.username
                }

            })
            element["username"] = currentUser

        })
        //find all usernames 

        res.json(newFeed)
    } catch (err) {
        res.json("failed to get pending requests")
    }

});



exports.refreshFeed = asyncHandler(async (req, res, next) => {

    try {
        //getting th profile for later
        let yourProfile = await profileModel.find({ user: req.userData.currentUser._id })


        let friends = yourProfile[0].friends


        //  { $gte: new Date(date).toISOString() }
        let response = await postModel.find({
            'user': { $in: friends },
            'createdAt': { $lt: req.headers.lastpost }
        }).sort({ createdAt: -1 }).limit(5);


        res.json(response)

    } catch (err) {
        res.json("failed to get pending requests")
    }

});