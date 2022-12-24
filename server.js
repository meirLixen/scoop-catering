const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userApi = require("./routes/userApi");
const productApi = require("./routes/productApi");
const orderApi = require("./routes/orderApi");
const categoryApi = require("./routes/categoryApi");
const emailApi = require("./routes/emailApi");
const amountApi = require("./routes/amountApi");
const productsOnOrderApi = require("./routes/productsOnOrderApi");
const axios = require('axios');
const multer = require("multer");
const cron = require("node-cron");
const nodemailer = require("nodemailer");

const UploadImage = require("./routes/upload")
const cors = require("cors");
const bodyParser = require("body-parser");


app.use(cors())
var products = path.join(__dirname, "public", "images", "products");
var categories = path.join(__dirname, "public", "images", "categories");
var icons = path.join(__dirname, "public", "images", "icons");

app.use(express.static(products));
app.use(express.static(categories));
app.use(express.static(icons));



require("./config/config");





app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use("/images", express.static(__dirname + "/images"));



app.use(
  "/api/",
  userApi,
  productApi,
  orderApi,
  categoryApi,
  emailApi,
  amountApi,
  productsOnOrderApi,
  UploadImage
);

app.use(express.json());

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
function updateOrders() {
  console.log("update orders every sunday with done status");
  axios.get('http://localhost:3001/api/orders/updateStatus')
    .then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
    axios.delete('http://localhost:3001/api/deleteAllProductsOnOrder')
    .then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
}
cron.schedule("0 5 * * sunday", function () {
  updateOrders()
})

//sendMail
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mindysahar@gmail.com",
    pass: "0583233770",
  },
});

let messageOptions = {
  from: "mindysahar@gmail.com",
  to: "shimonsahar@gmail.com",
  subject: "Scheduled Email",
  text: "Hi there. This email was automatically sent by us.",
};

//send email every monday at 11:00 automatically
cron.schedule("0 11 * * Monday", function () {
  console.log("---------------------");
  console.log("Running Cron Job");
  transporter.sendMail(messageOptions, function (error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
  });
});


app.use(express.static('public'));





//end---sendMail
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

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log("listening to port: " + port);
    });
  })
  .catch(console.error);

