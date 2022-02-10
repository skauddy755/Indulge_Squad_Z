const express = require("express"),
      mongoose = require("mongoose");

const router = express.Router();

router.get('/', (req, res) => {
    res.render("index.ejs");
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.json({
           data: req.body
       })
});

module.exports = router;