var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

const USER_ROLES = require('../config/webKeys').USER_ROLES

var adminSchema = new mongoose.Schema({
	// userId: String, // id of user schema
    email: String,
    contact: String,
});

module.exports = mongoose.model("Admin", adminSchema);