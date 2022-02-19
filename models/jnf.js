var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

const USER_ROLES = require('../config/webKeys').USER_ROLES

var jnfSchema = new mongoose.Schema({
	userId: String, // id of user schema
    companyId: String, // id of company schema

    date_of_creation: Date,
    last_modified: Date,
    
    data: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model("Jnf", jnfSchema);