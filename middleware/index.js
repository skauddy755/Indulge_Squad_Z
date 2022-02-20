const express           = require("express"),
      path              = require('path'),
      mongoose          = require("mongoose"),
      session           = require('express-session'),
      localStrategy     = require('passport-local'),
      methodOverride    = require('method-override'),
      flash             = require('connect-flash'),
      dotenv            = require("dotenv").config();

const webKeys           = require("../config/webKeys.js"),
      seedDB            = require("../config/seedDB.js");

const User              = require("../models/user"),
      Admin             = require("../models/admin"),
      Company           = require("../models/company"),
      Student           = require("../models/student"),
      Inf               = require("../models/inf"),
      Jnf               = require("../models/jnf");

const indexRoutes       = require('../routes/index'),
      testRoutes        = require('../routes/test');
    
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        req.flash("success", "Successfully Reached the dashboard...!!!");
        next();
    }
    else
    {
        req.flash("error", "You need to be signed-in to do that...!!!");
        res.redirect("/index/login");   
    }
}

middlewareObj.checkOwnership = function(req, res, next)
{
    if(req.params.userId == req.user._id)
    {
        next();
    }
    else
    {
        req.flash("error", "You don't have permission to do that...!!!");
        req.flash("success", "");
        res.redirect("/index/home");
    }
}

module.exports = middlewareObj;