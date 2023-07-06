const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userApi = require("./routes/userApi");
const productApi = require("./routes/productApi");
const menuApi = require("./routes/menuApi");
const orderApi = require("./routes/orderApi");
const categoryApi = require("./routes/categoryApi");
const emailApi = require("./routes/emailApi");
const amountApi = require("./routes/amountApi");
const productsOnOrderApi = require("./routes/productsOnOrderApi");
const axios = require('axios');
const multer = require("multer");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

const UploadImage = require("./routes/upload")
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({ origin: ["http://localhost:3000", "https://scoopcatering.co.il", "http://5.180.183.130:3000", "http://5.180.183.130:3001"], credentials: true }));
// app.use(cors({ origin:"https://scoopcatering.co.il" , credentials: true }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const products = path.join(__dirname, "public", "images", "products");
const categories = path.join(__dirname, "public", "images", "categories");
const icons = path.join(__dirname, "public", "images", "icons");
const backgrounds = path.join(__dirname, "public", "images", "backgrounds");

//app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use((req, res, next) => {
 
  const cookie = localStorage.getItem("cookie") || null;
  //const cookie = req.cookies ? req.cookies['scoopCode'] : null;
  const body = req.body ? req.body['scoopCode'] : null;

  if (cookie && cookie === "1234q^abcd") {
    console.log("cookie-1:", cookie);
    next()
  } else if (body) {
    console.log("cookie-2", cookie);
    if (body === "1234q^abcd") {
      localStorage.setItem("cookie", body)
      //res.cookie('scoopCode', body, { maxAge: 900000, httpOnly: true });
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    } else {
      res.send("invalid code")
    }
  } else {
    console.log("cookie-3", cookie);
    res.send(`
    <form action="/" method="post" style="text-align: center;">
    <label for="scoopCode" >Enter code:</label><br>
    <input type="text" id="scoopCode" name="scoopCode"><br><br>
    <input type="submit" value="Send">
  </form>
    `)
  }
})
app.use(express.static(products));
app.use(express.static(categories));
app.use(express.static(icons));
app.use(express.static(backgrounds));


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
  menuApi,
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
  axios.get('https://scoopcatering.co.il/orders/updateStatus')
    .then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
  axios.delete('https://scoopcatering.co.il/api/deleteAllProductsOnOrder')
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
      console.error("Email successfully sent!");
    }
  });
});


app.use(express.static('public'));

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
