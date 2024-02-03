const express = require("express");
const router = express.Router();
// profile

// profile    displays your profile
// profile/id   others profile
// profile/
router.get("/", function (req, res, next) {
    res.send("authenticated")
});


module.exports = router;