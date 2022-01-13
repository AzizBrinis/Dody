const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema ({
    firstName : String,
    lastName : String,
    username : String,
    phone : Number,
    password : String,
    googleId : String,
    facebookId : String,
    data : String,
    properties : { type : Array , "default" : [] },
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = User = mongoose.model("User", userSchema);