const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const AmountModel = require("../Amount");
const config = require("../../config/config");

const AMOUNTS = [];

function createRandomAmount() {
  return {
    name: faker.internet.userName(),
  };
}

Array.from({ length: 10 }).forEach(() => {
  AMOUNTS.push(createRandomAmount());
});

const handle = async () => {
  await mongoose.connect(config.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await AmountModel.deleteMany({});
  await AmountModel.insertMany(AMOUNTS);
};

(async () => {
  await handle();
  process.exit();
})();

module.exports = handle;
