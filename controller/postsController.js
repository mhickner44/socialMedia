const asyncHandler = require("express-async-handler");
const postModel=require("../models/posts")
const userModel=require("../models/user")
const profileModel= require("../models/profile")

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
        let newPost = new postModel(postDetail);
        await newPost.save();
       
        //update users profile with the post id
        const filter = {"user":req.userData.currentUser._id}
        const updateDoc={$push:{"posts":newPost._id}}
        await profileModel.updateOne(filter,updateDoc)
            
        res.json("post created")
    }catch(err) {
        res.json("failed to create post")
    }


});


exports.userPosts = asyncHandler(async (req, res, next) => {
    //respond with all the posts for that user
        
    //get user and located posts they have made 
    let yourProfile = await profileModel.find({ user: req.userData.currentUser._id })
    //WHY HAVE THIS?    
    // let currentUser = await userModel.findById(req.userData.currentUser._id)

    //array of psots from profile
    let postIDs=  yourProfile[0].posts
    let allPosts;
    //1 loop that creates a promises then make the requests
    //try to loop through the posts and make the requests through the loopp

    // console.log( postIDs[0]._id.toHexString())
    // postIDs.forEach(onePost => {
    // allPosts = await postModel.findById(onePost._id.toHexString())
    // });


    
    //loop through that array of posts making request
         //turn it into some json
        //  try{ 
        //     for await (const results of postIDs) {
        //     allPosts =  await postModel.findById(onePost._id)
        //     console.log(results)
        //   }
          
          console.log(results)

        res.json(results)
    // }catch(err){
            
    //         res.json("failed to fetch")
    //     }
   
    ///search for those posts 
})

// // create comments
// exports.comment = asyncHandler(async (req, res, next) => {
    
// });

