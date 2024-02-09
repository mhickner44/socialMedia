const express = require("express");
const router = express.Router();


const loginController = require("../controller/loginController");
// login

router.post("/",loginController.login);


// /login/createUser

router.post("/createUser",loginController.createUser);


module.exports = router;