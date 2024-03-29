const express = require("express");
const router = express.Router();
const postsController= require('../controller/postsController')

router.get("/",postsController.feed)

router.post("/createPost",postsController.createPost)


router.get("/userPosts",postsController.userPosts)

router.post("/createComment",postsController.createComment)

router.post("/likePost",postsController.likePost)


router.get("/post",postsController.post)

module.exports = router;