const express = require("express");
const router = express.Router();
const postsController= require('../controller/postsController')
// postFeed/postId/comment
// postFeed/postId/commentID/like
// postFeed/postId/comment/create
// postFeed/postId/comment/like
router.get("/",postsController.feed)

router.post("/createPost",postsController.createPost)


router.get("/userPosts",postsController.userPosts)
// router.post("/create/:id/comment",postsController.createComment)

// router.post("/create/:id/likeComment",postsController.likeComment)


module.exports = router;