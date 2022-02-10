const express = require("express"),
      mongoose = require("mongoose");

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200)
       .json({
           message: "Hi there",
           auth: 0
       })
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.json({
           data: req.body
       })
});

module.exports = router;