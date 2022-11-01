const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const CategoryModel = require("../Category");
const config = require("../../config/config");

const CATEGORIES = [];

function createRandomCategory() {
  return {
    name: faker.internet.userName(),
    hebrewName: faker.internet.userName(),
  };
}

Array.from({ length: 10 }).forEach(() => {
  CATEGORIES.push(createRandomCategory());
});

const handle = async () => {
  await mongoose.connect(config.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await CategoryModel.deleteMany({});
  await CategoryModel.insertMany(CATEGORIES);
};

(async () => {
  await handle();
  process.exit();
})();

module.exports = handle;
