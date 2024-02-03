//schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    //kwhat will i want accesible 
    //thers only two things
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
    }, { collection: 'user' }
);




// Export model
module.exports = mongoose.model("user", userSchema);