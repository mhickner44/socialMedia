const express = require("express");
const router = express.Router();
const profileController = require("../controller/profileController")

// const profileModel=require('../models/profile')



//this gets your profile


router.get("/", profileController.profile)


router.get("/myProfile", profileController.myProfile)





// /:id this will get a specific users profile

module.exports = router;