const path = require('path');
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Email = require('./models/Email')
const dotenv = require('dotenv')
const userApi = require('./routes/userApi')
const productApi = require('./routes/productApi')
const orderApi = require('./routes/orderApi')
const categoryApi = require('./routes/categoryApi')
const emailApi = require('./routes/emailApi')
const amountApi = require('./routes/amountApi')
const productsOnOrderApi = require('./routes/productsOnOrderApi')
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const fileupload = require("express-fileupload");
const cors = require('cors')
// const helmet = require('helmet');
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
let emails

// const { db } = require('./models')

app.use(cors())
// dotenv.config({ path: 'C:\Users\mindy\Downloads\openssl-0.9.8k_X64\bin' })

dotenv.config();

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
// Define Routes
app.use('/images', express.static(__dirname + '/images'));
app.use('/api/upload', require('./routes/api/upload'));
//
app.use('/', userApi, productApi, orderApi, categoryApi, emailApi, amountApi, productsOnOrderApi)

app.use(express.json())
//File uploade
app.use(fileupload());
// Set security headers
// app.use(helmet());
// app.get('/', (req, res) => { res.send('hello world') })

// if(req.get('host')=="https://scoopcatering.co.il/")
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));

});



// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}
// mongoose.connect(process.env.DB_CONNECT, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// }, () => {
//     console.log("connected to db")
//     // emails = db.Email.find();
//     // console.log(emails);

// })




mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}
)

//sendMail
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mindysahar@gmail.com',
        pass: '0583233770'
    }
});


let messageOptions = {
    from: 'mindysahar@gmail.com',
    to: 'shimonsahar@gmail.com',
    subject: 'Scheduled Email',
    text: 'Hi there. This email was automatically sent by us.'
};
//send email every monday at 11:00 automatically
cron.schedule('0 11 * * Monday', function () {
    console.log('---------------------');
    console.log('Running Cron Job');
    transporter.sendMail(messageOptions, function (error, info) {
        if (error) {
            throw error;
        } else {
            console.log('Email successfully sent!');
        }
    });
});
//end---sendMail
app.listen(port, () => {
    console.log(" listening to port :" + port);
})
// export let MSGS = {
//     'key': {
//         en: 'קוד',
//         he: "code",

//     }
// }

// let LANG = localStorage.getItem('LANG');
// if (!LANG || LANG == '' || LANG == 'undefined') {
//     LANG = 'he';
//     localStorage.setItem('LANG', 'he');
// }

// export const findword = (word) => {
//     return MSGS[key].LANG
// }