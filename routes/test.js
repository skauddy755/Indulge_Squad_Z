const express = require("express"),
      mongoose = require("mongoose");

const router = express.Router();

router.get('/test/testPage', (req, res) => {
    res.render("testPage.ejs");
});

router.post('/test/testPage', (req, res) => {
    console.log(req.body);
    res.redirect("/testPage")
});

module.exports = router;