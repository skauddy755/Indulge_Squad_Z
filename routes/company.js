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

router.get('/:userId/dashboard', middlewareObj.isLoggedIn, middlewareObj.checkOwnership, (req, res) => {
    page = "dashboard_company.ejs";
    Company.findById(req.user.detailsId, (err, item) => {
        if(err) res.redirect('/index/home');
        else {
            data = item;
            console.log(page, data);
            res.render(page, {detailsData: data, userId: req.params.userId});
        }
    });
})

// router(':userId/profile/show', (req, res) => {
//     res.render('')
// })

// router(':userId/profile/edit', (req, res) => {
//     res.render('')
// })

router.get('/:userId/inf/create', middlewareObj.isLoggedIn, middlewareObj.checkOwnership, (req, res) => {
    res.render('inf.ejs' , {userId: req.params.userId});
})

router.post('/:userId/inf/create', middlewareObj.checkOwnership, (req, res) => {
    console.log(req.body);
    infData = JSON.parse(req.body.infData);
    console.log(infData);

    let inf = new Inf({});
    for(key in infData) inf[key] = infData[key];
    inf.save((err) => {
        if(err)
            res.redirect(`/company/${req.params.userId}/inf/create`);
        else
            res.redirect(`/company/${req.params.userId}/dashboard`);
    });
})

// router.get(':userId/inf/edit/:infId', (req, res) => {
//     console.log(req.body);
// })

// router.post(':userId/inf/edit/:infId', (req, res) => {

// })

module.exports = router;