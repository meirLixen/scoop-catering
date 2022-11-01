const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const EmailModel = require("../Email");
const config = require("../../config/config");

const EMAILS = [];

function createRandomEmail() {
  return {
    email: faker.internet.email(),
  };
}

Array.from({ length: 10 }).forEach(() => {
  EMAILS.push(createRandomEmail());
});

const handle = async () => {
  await mongoose.connect(config.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await EmailModel.deleteMany({});
  await EmailModel.insertMany(EMAILS);
};

(async () => {
  await handle();
  process.exit();
})();

module.exports = handle;
