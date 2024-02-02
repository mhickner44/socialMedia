//schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
    //kwhat will i want accesible 
    //thers only two things
    {
        userID: { type: String, required: true },
        comment: { type: String, required: true },
        likes: { type: Integer },
        postID: {type: String, required: true }
    }, { collection: 'posts' }
);




// Export model
module.exports = mongoose.model("comments", commentSchema);