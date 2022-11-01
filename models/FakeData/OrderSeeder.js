const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const OrderModel = require("../Order");
const UserModel = require("../User");
const config = require("../../config/config");
const ProductModel = require("../Product");

const ORDERS = [];

function createRandomOrder(userId, productId) {
  if (!userId) return null;
  return {
    createDate: faker.date.past(),
    name: faker.internet.userName(),
    userId,
    numItems: 1,
    CostToPay: faker.datatype.number(100),
    city: faker.address.city(),
    shippingAddress: faker.address.streetAddress(true),
    MethodsOfPayment: faker.random.words(1),
    products: [productId],
  };
}

const handle = async () => {
  await mongoose.connect(config.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const user = await UserModel.findOne({}).lean();
  const userId = user._id;

  const product = await ProductModel.findOne({}).lean();
  productId = product._id;

  Array.from({ length: 10 }).forEach(() => {
    ORDERS.push(createRandomOrder(userId, productId));
  });

  await OrderModel.deleteMany({});
  await OrderModel.insertMany(ORDERS);
};

(async () => {
  await handle();
  process.exit();
})();

module.exports = handle;
