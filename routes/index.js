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

const router = express.Router();

router.get('/home', (req, res) => {
    res.render('homepage.ejs');
})

router.get('/dashboard/:userId', (req, res) => {
    res.render('dashboard.ejs');
})

// ===================================================================
// REGISTRATION ROUTES:
// ===================================================================

router.get('/register_admin', (req, res) => {
    res.render('register_admin.ejs');
})

router.post('/register_admin', (req, res) => {
    console.log(req.body);
    
    let nd = new Admin({
        email: req.body.email,
        contact: req.body.contact
    });
    nd.save((err) => {
        if(err) {
            console.log(err);
            res.redirect('/index/register_admin');
        }
        else {
            let nu = new User({
                username: req.body.username,
                isVerified: false,
                detailsId: nd._id
            });
            User.register(nu, req.body.password, function(err, item){
                if(err)
                {
                    console.log(err);
                    req.flash("error", err.message);
                    return res.redirect("/index/register_admin");
                }
                passport.authenticate("local")(req, res, function(){
                    console.log(item);
                    req.flash("success", "Successfully signed you in...!!");
                    res.redirect("/index/dashboard/" + item._id);
                });
            });
        }
    });

})

router.get('/register_company', (req, res) => {
    res.render('register_company.ejs');
})
router.get('/register_student', (req, res) => {
    res.render('register_student.ejs');
})



router.get('/login', (req, res) => {
    res.render('login.ejs');
})

router.post(
    '/login',
    passport.authenticate('local', {failureRedirect: '/index/login'}),
    (req, res) => {
        console.log("Logged in succcessfully...");
        console.log(req.user);
        res.redirect('/index/dashboard/' + req.user._id);
    }
)

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/home');
})





// ======================================================================================================
// DUMMY ROUTES:
// ======================================================================================================

router.get('/reg', (req, res) => {
    res.render("register.ejs");
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.json({
           data: req.body
       })
});

module.exports = router;