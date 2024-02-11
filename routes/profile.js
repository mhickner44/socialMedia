const express = require("express");
const router = express.Router();
const profileController=require("../controller/profileController")

// const profileModel=require('../models/profile')

// profile

// profile    displays your profile
// profile/id   others profile
// profile/

//this gets your profile
router.get("/",profileController.profile)

router.get("/:id",profileController.profileDetail)

// /:id this will get a specific users profile

module.exports = router;