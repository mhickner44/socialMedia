//schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    //kwhat will i want accesible 
    //thers only two things
    {
        posts: { type: Array, required: true },
        comments: { type: Array, required: true },
        friends: { type: Array },
        picture: { type: String, required: true }
    }, { collection: 'posts' }
);




// Export model
module.exports = mongoose.model("user", userSchema);