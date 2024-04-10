

let loginRouter = require('./routes/login');
let profileRouter = require('./routes/profile');
let followReqRouter = require('./routes/requests');
let postsRouter = require('./routes/postsRoute');
require('dotenv').config()
const jwt = require('jsonwebtoken')

var express = require('express');
var path = require('path');
var mongoose = require('mongoose')
var cors = require("cors")

const multer = require('multer');
const fs = require('fs');
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'dvef6co9u',
  api_key: process.env.cloudKey,
  api_secret: process.env.cloudSecret
});

// var = = require('./routes/editor');
// var usersRouter = require('./routes/users');

var app = express();

const mongoDb = process.env.mongoConnectionURI;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));





app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())


app.use('/login', loginRouter);

//put the auth middleware after so the login info doesnt need auth info

//CORS 


const verifyToken = function (req, res, next) {
  //verify the token 

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.json(403);
    } else {
      req.userData = authData;

      next()
    }
  });


};

function formatToken(req, res, next) {

  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
 
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;

    //decode the token here to know what user is accessing the information

    // Next middleware
    next();
  } else {
    // Forbidden
    res.json(403);
  }
}

app.use(formatToken, verifyToken)

//does every route need to be authenticated?

app.use('/profile', profileRouter);

app.use("/postFeed", postsRouter);

app.use('/requests', followReqRouter);


//file upload 

const profileModel = require('./models/profile')


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'fileStorage/')
  },
  filename: (req, file, callback) => {
    let filename = `image-${Date.now()}.${file.originalname}`
    callback(null, filename)
    req.filename = filename
    req.name = file.originalname
  }
})
const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'fileStorage')));

app.post('/uploads', upload.single('picture'), async function (req, res) {
  try {
    let cloudRES = await cloudinary.uploader.upload(`/home/mhick/repos/socialMedia/fileStorage/${req.filename}`,

      { folder: "devTop", public_id: req.userData.currentUser.username+req.name },
      function (error, result) { console.log(result) });
    //delete the picture from the project

    fs.unlink(`fileStorage/${req.filename}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File deleted successfully');
    });

    //store this in the user profile 


    console.log(req.userData.currentUser._id)
    // find and updat
    let response = await profileModel.findOneAndUpdate({ user: req.userData.currentUser._id }, { "profilePic": cloudRES.url }, { new: true })


    res.json(response)
  }
  catch { res.json("error in profile pic uplaod") }
})

// // catch 404 and forward to error handler
app.get("/", function (req, res, next) {
  res.send("test")

  res.json("changed the messagez")
  console.log(res)
});

app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});




app.listen(3000, () => console.log("app listening on port 3000!"));



module.exports = app;
