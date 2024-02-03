const express = require("express");
const router = express.Router();


const loginController = require("../controller/loginController");
// login

// /login


router.post("/",loginController.login);


// /login/createUser

router.post("/createUser",loginController.createUser);


//   // /login/authenticate?
//   Router.get("/createUser",function (req, res, next) {
//     res.send("create users")
//   });


module.exports = router;