const asyncHandler = require("express-async-handler");
const post=require("../models/posts")


//create posts
exports.createPost = asyncHandler(async (req, res, next) => {
    //get the user id whose making the post
        //sghoudl this be done through the token
   
 
    let postDetail={
        title: req.body.title,
        content: req.body.content,
        likes:0,
        user: req.userData.currentUser._id,
    }
    //write the post to the db
    
    try{
        let newPost = new post(postDetail);
        await newPost.save();

        res.json("post created")
    }catch(err) {
        res.json("failed to create post")
    }


});


// // create comments
// exports.comment = asyncHandler(async (req, res, next) => {
    
// });