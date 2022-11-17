const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");

faker.locale = "es";

module.exports = async () => {
  await mongoose.connection.dropDatabase();
  const users = [];

  const admin = new User({
    firstname: "admin",
    lastname: "admin",
    email: "admin@admin.com",
    address: "street 1234",
    password: "1",
    phoneNumber: "123456789",
    isAdmin: true,
  });
  admin.slug = slugify(`${admin.firstname} ${admin.lastname}`, "_");
  await admin.save();

  for (let i = 0; i < 10; i++) {
    const user = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      password: "1",
      phoneNumber: "123456789",
      isAdmin: false,
    });
    user.slug = slugify(`${user.firstname} ${user.lastname}`, "_");
    users.push(user);
  }

  await admin.save();
  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
