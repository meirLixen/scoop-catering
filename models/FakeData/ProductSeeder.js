const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const ProductModel = require("../Product");
const CategoryModel = require("../Category");
const config = require("../../config/config");

const PRODUCTS = [];

function createRandomProduct(categoryId) {
  if (!categoryId) return;

  return {
    name: faker.random.words(2),
    hebrewName: faker.random.words(2),
    price: faker.datatype.number(100),
    description: faker.random.words(20),
    hebrewDescription: faker.random.words(20),
    img: faker.image.imageUrl(),
    available: faker.datatype.boolean(),
    display: faker.datatype.boolean(),
    categoryID: categoryId,
  };
}

const handle = async () => {
  await mongoose.connect(config.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const category = await CategoryModel.findOne({}).lean();
  const categoryId = category._id;

  Array.from({ length: 10 }).forEach(() => {
    ORDERS.push(createRandomProduct(categoryId));
  });

  await ProductModel.deleteMany({});
  await ProductModel.insertMany(PRODUCTS);
};

(async () => {
  await handle();
  process.exit();
})();

module.exports = handle;
