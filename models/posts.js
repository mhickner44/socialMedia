//schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
    //kwhat will i want accesible 
    //thers only two things
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        user: {type: Schema.Types.ObjectId },
        likes:{type: Number},
        comments: {type: Array}
    }, { timestamps: true }, { collection: 'posts' }
);


//need virtual url with its id in it 
// Virtual for book's URL
// categorySchema.virtual("url").get(function () {
//     // We don't use an arrow function as we'll need the this object
//     return `/category/${this._id}`;
// });

// postSchema.set(timestamps,true)


// Export model
module.exports = mongoose.model("posts", postSchema);