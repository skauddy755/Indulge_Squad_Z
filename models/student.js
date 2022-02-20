var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

const USER_ROLES = require('../config/webKeys').USER_ROLES

var studentSchema = new mongoose.Schema({
	// userId: String, // id of user schema
    full_name: String,
    official_email: String,
    personal_email: String,
    contact: String,
    admNo: String,
    programme: String,
    branch: String,
    grad_year: Number,
    cpi: Number
});

module.exports = mongoose.model("Student", studentSchema);