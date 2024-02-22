const express = require("express");
const router = express.Router();
const postsController= require('../controller/postsController')
// postFeed/postId/comment
// postFeed/postId/commentID/like
// postFeed/postId/comment/create
// postFeed/postId/comment/like

router.post("/createPost",postsController.createPost)

// router.post("/create/:id/comment",postsController.createComment)

// router.post("/create/:id/likeComment",postsController.likeComment)


module.exports = router;