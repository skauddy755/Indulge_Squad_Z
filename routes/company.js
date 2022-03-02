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
      
const pdf = require('pdf-creator-node');
const fs = require('fs');

const middlewareObj     = require('../middleware/index');


const router = express.Router();

router.get('/:userId/dashboard', middlewareObj.isLoggedIn, middlewareObj.checkOwnership, (req, res) => {
    
    res.redirect(`/company/${req.params.userId}/forms`)
    
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

// router('/:userId/profile/show', (req, res) => {
//     User.findById(req.params.userId, (err, item) => {
//         if(err) res.redirect('/index/home');
//         else {
//             data = item;
//             console.log(page, data);
//             res.render(page, {detailsData: data, userId: req.params.userId});
//         }
//     });
//     res.render('profile_company.ejs');
// })

// router(':userId/profile/edit', (req, res) => {
//     res.render('')
// })

router.get('/:userId/forms', middlewareObj.isLoggedIn, middlewareObj.checkOwnership, (req, res) => {
    User.findById(req.params.userId, (err, u) => {
        if(err) res.redirect('/index/home');
        else {
            Company.findById(u.detailsId, (err, c) => {
                if(err) res.redirect('/index/home');
                else {
                    c.infs.forEach((infId) => {
                        Inf.findById(infId, (err, inf) => {
                            res.render('forms_company.ejs', {userId: req.params.userId, userData: u, companyData: c, infData: inf});
                        });
                    });
                }
            });
        }
    });
    
})

router.get('/:userId/inf/create', middlewareObj.isLoggedIn, middlewareObj.checkOwnership, (req, res) => {
    res.render('inf.ejs' , {userId: req.params.userId});
})

router.post('/:userId/inf/create', middlewareObj.checkOwnership, (req, res) => {
    console.log(req.body);
    infData = JSON.parse(req.body.infData);
    console.log(infData);

    
    let inf = new Inf({
        date_of_creation: Date(),
        last_modified: Date(),
        
    });
    for(key in infData) inf[key] = infData[key];
    inf.save((err) => {
        if(err)
        res.redirect(`/company/${req.params.userId}/inf/create`);
        else {
            User.findById(req.params.userId, (err, u) => {
                if(err) res.redirect('/index/home');
                else {
                    let dId = u.detailsId;
                    Company.findById(dId, (err, c) => {
                        if(err) res.redirect('/index/home');
                        else {
                            c.infs.push(inf._id);
                            c.save((err) => {
                                if(err) res.redirect('/index/home');
                                else res.redirect(`/company/${req.params.userId}/dashboard`);
                            });
                        }
                    });
                }
            });
            
        }
    });
})

const genPdf = (req, res, inf, infId) => {
    let html = fs.readFileSync('template_inf.html', 'utf-8');

    let options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;"></div>'
        },
        footer: {
            height: "28mm",
            contents: {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    };
    console.log(inf);
    let document = {
        html: html,
        data: {
            infData: inf
        },
        path: `./public/docs/inf/inf_${infId}.pdf`,
        type: "",
    };

    pdf
        .create(document, options)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
        console.error(error);
    });
}

router.get('/:userId/inf/:infId/genPdf', middlewareObj.isLoggedIn, middlewareObj.checkOwnership, (req, res) => {
    Inf.findById(req.params.infId, (err, item) => {
        if(err) res.redirect('/index/home');
        else {
            // genPdf(req, res, item, req.params.infId);
            // res.redirect(`/company/${req.params.userId}/dashboard`);
            res.render('template_inf.ejs', {infData: item});
        }
    });
})

router.get('/:userId/inf/:infId/download', middlewareObj.isLoggedIn, middlewareObj.checkOwnership, (req, res) => {
    
})

// router.get(':userId/inf/edit/:infId', (req, res) => {
//     console.log(req.body);
// })

// router.post(':userId/inf/edit/:infId', (req, res) => {

// })

module.exports = router;