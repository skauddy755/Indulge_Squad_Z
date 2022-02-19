var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

const USER_ROLES = require('../config/webKeys').USER_ROLES

var userSchema = new mongoose.Schema({
	username: String,
    password: String,
    role: {
        type: String,
        enum: [USER_ROLES.ADMIN, USER_ROLES.COMPANY, USER_ROLES.STUDENT]
    },
    isVerified: Boolean,
    detailsId: String // id of either of the following {Admin, Company, Student}
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);