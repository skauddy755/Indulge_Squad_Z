const express = require("express"),
      mongoose = require("mongoose");

const router = express.Router();

router.get('/test/testPage', (req, res) => {
    res.render("register.ejs");
});

router.post('/test/testPage', (req, res) => {
    console.log(req.body);
    res.redirect("/testPage")
});

router.get('test/testejs', (req, res) => {
    res.render('register.ejs');
});

module.exports = router;