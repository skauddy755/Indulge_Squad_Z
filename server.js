const express         = require("express"),
      path            = require('path'),
      mongoose        = require("mongoose"),
      dotenv          = require("dotenv").config();

const webKeys     = require("./config/webKeys.js"),
      seedDB      = require("./config/seedDB.js");

const app = new express();

const mongo_uri = process.env.MONGO_URI_PROD;
console.log(mongo_uri);
console.log(process.env.NODE_ENV);
mongoose.connect(mongo_uri, {useUnifiedTopology:true, useNewUrlParser:true})
    .then(() => {});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", express.static(path.join(__dirname, 'public')));

app.use("/test", require('./routes/test'));
app.use("/home", require('./routes/index'));

const port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log(`Server is running at Port: ${port}`);
});