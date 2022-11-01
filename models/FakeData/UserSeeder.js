const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const UserModel = require("../User");
const config = require("../../config/config");

const USERS = [];

function createRandomUser() {
  return {
    userType: "admin",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.streetAddress(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number("052#######"),
  };
}

Array.from({ length: 10 }).forEach(() => {
  USERS.push(createRandomUser());
});

const handle = async () => {
  await mongoose.connect(config.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await UserModel.deleteMany({});
  await UserModel.insertMany(USERS);
};

(async () => {
  await handle();
  process.exit();
})();

module.exports = handle;
