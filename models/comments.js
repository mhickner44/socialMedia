//schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
    //kwhat will i want accesible 
    //thers only two things
    {
        userID: {type: Schema.Types.ObjectId, required: true },
        comment: { type: String, required: true },
        likes: { type: Number },
        postID: {type: Schema.Types.ObjectId , required: true }
    }, { collection: 'comments' }
);




// Export model
module.exports = mongoose.model("comments", commentSchema);