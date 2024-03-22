
const express = require("express");
const router = express.Router();
const reqController= require('../controller/requestsController')
// followReq   display the requests
// followReq/accept 
// followReq/decline


router.post("/",reqController.reqFriend)

router.post("/confirmFriend",reqController.confirmFriend)

router.get("/pending",reqController.getPending)

router.get("/feed",reqController.getFeed)

router.get("/refreshFeed",reqController.refreshFeed)

module.exports = router;