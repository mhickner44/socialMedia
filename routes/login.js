const express = require("express");
const router = express.Router();


const loginController = require("../controller/loginController");
// login

// /login




router.get("/",loginController.login);


// /login/createUser

// Router.get("/createUser", function (req, res, next) {
//     res.send("create users")
// });


//   // /login/authenticate?
//   Router.get("/createUser",function (req, res, next) {
//     res.send("create users")
//   });


module.exports = router;