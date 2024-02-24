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

    try{
        let yourProfile = await profileModel.find({ user: req.userData.currentUser._id })

    //create promises and store them in an array
    //loop through the promises  
    //setup get each posts for 10
   
    //get post ids
   let postArr = yourProfile[0].posts.map((post) =>post._id.toHexString())
  //get the posts info for each other then 10 max
  console.log(postArr[1])

  //do promise to get all of the posts 
  let result =postArr.map((post) =>post= postModel.findById(post))
//   let result =await postModel.findById(postArr[0])
//promise loop through all of these
console.log(result)
          

        res.json(result)
    }catch(err){
            
            res.json("failed to fetch")
        }
   
    ///search for those posts 
})

// // create comments
// exports.comment = asyncHandler(async (req, res, next) => {
    
// });

