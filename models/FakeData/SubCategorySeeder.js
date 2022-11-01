// const { faker } = require("@faker-js/faker");
// const mongoose = require("mongoose");
// const SubCategoryModel = require("../SubCategory");
// const config = require("../../config/config");

// const SUB_CATEGORIES = [];

// function createRandomSubCategory() {
//   return {
//     createDate: faker.date.past(),
//     name: faker.internet.userName(),
//   };
// }

// Array.from({ length: 10 }).forEach(() => {
//   SUB_CATEGORIES.push(createRandomSubCategory());
// });

// const handle = async () => {
//   await mongoose.connect(config.DB_CONNECT, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   await SubCategoryModel.deleteMany({});
//   await SubCategoryModel.insertMany(SUB_CATEGORIES);
// };

// (async () => {
//   await handle();
//   process.exit();
// })();

// module.exports = handle;

