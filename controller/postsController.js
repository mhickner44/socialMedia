const asyncHandler = require("express-async-handler");
const postModel = require("../models/posts")
const userModel = require("../models/user")
const profileModel = require("../models/profile")
const commentModel = require("../models/comments")

exports.feed = asyncHandler(async (req, res, next) => {
    // -take friends list and return any posts that match their friends 
    // -stored in chronological order 
    // -get time of the posts and compare / put them in order 
    // -make display them in chronological order

    let friendsList = await profileModel.find({ user: req.userData.currentUser._id })


    //search posts for created by these users 


    let posts = await postModel.find({ 'user': { $in: friendsList[0].friends } })

    res.json(posts)
})

//create posts
exports.createPost = asyncHandler(async (req, res, next) => {
    //get the user id whose making the post
    //sghoudl this be done through the token

    let postDetail = {
        title: req.body.title,
        content: req.body.content,
        likes: 0,
        user: req.userData.currentUser._id,
    }
    //write the post to the db

    try {
        let newPost = new postModel(postDetail);
        await newPost.save();

        //update users profile with the post id
        const filter = { "user": req.userData.currentUser._id }
        const updateDoc = { $push: { "posts": newPost._id } }
        await profileModel.updateOne(filter, updateDoc)

        res.json("post created")
    } catch (err) {
        res.json("failed to create post")
    }


});


// // create comments
exports.createComment = asyncHandler(async (req, res, next) => {

    try {
        console.log(req.body)
        let commentDetail = {
            userID: req.userData.currentUser._id,
            comment: req.body.comment,
            likes: 0,
            postID: req.body.postID

        }

        //create the comment 
        let newComment = new commentModel(commentDetail);
        commentDetail = await newComment.save();
        console.log(commentDetail)

        //will need to add the comment id to the post 
        await postModel.findById(req.body.postID)

        let post = await postModel.findOneAndUpdate({ "_id": req.body.postID }, { "$push": { comments: commentDetail._id } })

        console.log(post)

        res.json("comment created")
    } catch {
        res.json("error commenting")
    }
});


exports.userPosts = asyncHandler(async (req, res, next) => {
    //respond with all the posts for that user

    //get user and located posts they have made 
    let yourProfile, postArr, postContent;

    try {

        if (req.headers.user != "undefined") {
            user = await userModel.find({ 'username': req.headers.user })


            userID = user[0]._id.toHexString()
            yourProfile = await profileModel.find({ user: userID })

        }
        else {
            yourProfile = await profileModel.find({ user: req.userData.currentUser._id })
        }

        postArr = yourProfile[0].posts.map((post) => post._id.toString())

        postContent = await postModel.find({ '_id': { $in: postArr } })


        res.json(postContent)
    } catch (err) {

        res.json("failed to fetch")
    }

    ///search for those posts 
})


exports.post = asyncHandler(async (req, res, next) => {




    try {
        //get the post information 
        let post = await postModel.findById(req.headers.postid)

        let poster = await userModel.find({ _id: post.user.toHexString() })



        let comments = await commentModel.find({ '_id': { $in: post.comments } })

        //get the users from the comments
        let commentUsers = comments.map(function (element) {
            return element.userID
        })

        //get the usernames of each id here
        let usernames = await userModel.find({ _id: { "$in": commentUsers } })

        // //get the users for each object 
        // let usernames = await userModel.find({ _id: { "$in": comments. } })
        comments = comments.map(function (element, index) {

            return element.toObject()
        })


        comments.forEach(function (element) {

            let currentUser = element.userID

            usernames.forEach((e) => {

                if (currentUser == e._id.toHexString()) {
                    //replace it with the correct usernames 
                    currentUser = e.username
                }
            })
            element["userID"] = currentUser
        })


        //getting the user who made the post

        post = post.toObject();
        post.username = poster[0].username



        responsejSON = {
            post: post,
            comments: comments
        }
        //     console.log(comments)
        //get the comments json as well

        res.json(responsejSON)
    } catch {
        res.json("error returning post")
    }

})



exports.likePost = asyncHandler(async (req, res, next) => {
    try {
        //get the id of the post and place it in the comment update 
        console.log(req.body.postID)

        await postModel.findOneAndUpdate({ _id: req.body.postID }, { $inc: { "likes": 1 } })


        // let commentUpdate= await comment.findOneAndUpdate({_id:req.headers.id})
        res.json("like post ")
    } catch {
        res.json("did not like ")
    }

})


