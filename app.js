

let loginRouter = require('./routes/login');
let profileRouter = require('./routes/profile');
let followReqRouter = require('./routes/requests');
let postsRouter = require('./routes/postsRoute');
require('dotenv').config()

var express = require('express');
var path = require('path');
var mongoose = require('mongoose')
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

//authenticate at editor router level?
//middleware?
const authMiddlware = function (req, res, next) {
    req.body.authInfo="fuck me"
    next()
};





//put it here?

app.use('/login', loginRouter);

//put the auth middleware after so the login info doesnt need auth info
app.use(authMiddlware)


//does every route need to be authenticated?

app.use("/postFeed", postsRouter);


app.use('/profile', profileRouter);

app.use('/requests', followReqRouter);


// // catch 404 and forward to error handler
app.get("/", function (req, res, next) {
    res.send("test")
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

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }


module.exports = app;
