const { required } = require("joi");
const mongoose = require("mongoose");
const schema = mongoose.schema;
const passportLocalmongoose = require("passport-local-mongoose");


const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required: true
    }
});

userSchema.plugin(passportLocalmongoose);

module.exports = mongoose.model('User', userSchema)