// const { faker } = require("@faker-js/faker");
// const mongoose = require("mongoose");
// const ProductsOnOrderModel = require("../ProductsOnOrder");
// const config = require("../../config/config");


// const PRODUCTS_ON_ORDER = [];

// function createRandomProductsOnOrder() {
//   return {
//     createDate: faker.date.past(),
//     name: faker.internet.userName(),
//   };
// }

// Array.from({ length: 10 }).forEach(() => {
//   PRODUCTS_ON_ORDER.push(createRandomProductsOnOrder());
// });

// const handle = async () => {
//   await mongoose.connect(config.DB_CONNECT, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   await ProductsOnOrderModel.deleteMany({});
//   await ProductsOnOrderModel.insertMany(PRODUCTS_ON_ORDER);
// };

// (async () => {
//   await handle();
//   process.exit();
// })();

// module.exports = handle;

