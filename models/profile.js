//schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema(
    //kwhat will i want accesible 
    //thers only two things
    {
        posts: { type: [Schema.Types.ObjectId], required: true },
        comments: { type: [Schema.Types.ObjectId], required: true },
        friends: { type: [Schema.Types.ObjectId] },
        picture: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, required: true },
    }, { collection: 'profile' }
);




// Export model
module.exports = mongoose.model("profile", profileSchema);