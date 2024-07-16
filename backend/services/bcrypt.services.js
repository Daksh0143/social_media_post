const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const hashPassword = (value) => {
  console.log("value", value);
  return bcrypt.hash(value, 10);
};

const comparePassword = ({ enteredPassword, password }) => {
  return bcrypt.compare(enteredPassword, password);
};

const generateJWTToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" });
};

module.exports = { hashPassword, comparePassword, generateJWTToken };
