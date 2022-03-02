const express = require("express"),
      mongoose = require("mongoose");

const pdf = require('pdf-creator-node');
const fs = require('fs');

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

router.get('/genpdf', (req, res) => {
    let html = fs.readFileSync('template.html', 'utf-8');

    let options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
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

    let users = [
        {
          name: "Shyam",
          age: "26",
        },
        {
          name: "Navjot",
          age: "26",
        },
        {
          name: "Vitthal",
          age: "26",
        },
    ];
    obj = {
        x: 45,
        y: "sandeep",
        z: {
            a: "kumar",
            b: "auddy",
            c: [7, 5, 5]
        }
    }
    // obj = JSON.stringify(obj);
    let document = {
        html: html,
        data: {
            users: users,
            testData: obj
        },
        path: "./public/docs/output.pdf",
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
})

router.get('/download', (req, res) => {
    res.render('test/downloadPage.ejs');
})

module.exports = router;