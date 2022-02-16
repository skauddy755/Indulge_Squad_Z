const express = require("express"),
      mongoose = require("mongoose");

const router = express.Router();

router.get('/testPage', (req, res) => {
    res.render("register.ejs");
});

router.post('/testPage', (req, res) => {
    console.log(req.body);
    res.redirect("/testPage")
});

router.get('/testejs', (req, res) => {
    // res.render('register.ejs');
    res.redirect("/reg");
});

module.exports = router;