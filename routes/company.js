const express           = require("express"),
      passport          = require('passport'),
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

const middlewareObj     = require('../middleware/index');


const router = express.Router();

router.get('/:userId/dashboard', (req, res) => {
    page = "dashboard_company.ejs";
    Company.findById(req.user.detailsId, (err, item) => {
        if(err) res.redirect('/index/home');
        else {
            data = item;
            console.log(page, data);
            res.render(page, {detailsData: data});
        }
    });
})

// router(':userId/profile/show', (req, res) => {
//     res.render('')
// })

// router(':userId/profile/edit', (req, res) => {
//     res.render('')
// })

router.get('/:userId/inf/create', (req, res) => {
    res.render('inf.ejs');
})

router.post('/:userId/inf/create', (req, res) => {
    console.log(req.body);
})

// router.get(':userId/inf/edit/:infId', (req, res) => {
//     console.log(req.body);
// })

// router.post(':userId/inf/edit/:infId', (req, res) => {

// })

module.exports = router;