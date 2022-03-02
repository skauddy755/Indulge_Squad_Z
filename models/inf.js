var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

const USER_ROLES = require('../config/webKeys').USER_ROLES

var infSchema = new mongoose.Schema({

    date_of_creation: Date,
    last_modified: Date,
    
    poc_info: mongoose.Schema.Types.Mixed,
    company_overview: mongoose.Schema.Types.Mixed,
    internship_duration: mongoose.Schema.Types.Mixed,
    intern_profile: mongoose.Schema.Types.Mixed,
    stipend_details: mongoose.Schema.Types.Mixed,
    eligible_courses: mongoose.Schema.Types.Mixed,
    selection_process: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model("Inf", infSchema);