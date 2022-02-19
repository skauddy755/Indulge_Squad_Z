var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

const USER_ROLES = require('../config/webKeys').USER_ROLES

var companySchema = new mongoose.Schema({
	// userId: String, // id of user schema
    email: String,
    contact: String,
    companyName: String,
    infs: [String], // id of infs
    jnfs: [String] // id of jnfs
});

module.exports = mongoose.model("Company", companySchema);