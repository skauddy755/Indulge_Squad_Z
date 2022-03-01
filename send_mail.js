const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: 'sandeepkrauddy755ms@outlook.com',
        pass: '@ska755dog123'
    }
});

const options = {
    from: 'sandeepkrauddy755ms@outlook.com',
    to: 'sandeep.19je0741@me.iitism.ac.in',
    subject: 'Test Email from NodeMailer',
    text: 'An experiment for indulge_squad_z'
}

transporter.sendMail(options, (err, info) => {
    if(err) console.log(err);
    else console.log(info.response);
});