const path = require("path");
const dotenv = require("dotenv");

const dotenvConfig = dotenv.config({
  path: path.join(__dirname, "../", ".env"),
});

if (dotenvConfig.error) {
  console.error("ERROR! Couldnt load .env file \n", dotenvConfig.error);
}

const config = {
  DB_CONNECT: process.env.DB_CONNECT,
};

module.exports = config;
