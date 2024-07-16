const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const {
  failureResponse,
  successResponse,
} = require("../helper/api.helper.response");
const { hashPassword } = require("../services/bcrypt.services");

const userRegistrationValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().required().lowercase(),
    lastName: Joi.string().required().lowercase(),
    email: Joi.string().email().required(),
    mobile: Joi.string()
      .required()
      .min(10)
      .max(10)
      .pattern(/^[0-9]+$/)
      .required(),
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{6,}$/),
  });

  const value = schema.validate(req.body);
  console.log("value", value);
  if (value.error) {
    return failureResponse({
      res,
      message: "Something Went Wrong",
      statusCode: 501,
    });
  }
  req.body.password = await hashPassword(req.body.password);
  next();
};

const loginValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return failureResponse({
      res,
      message: "Something Went Wrong",
      statusCode: 500,
    });
  }
  next();
};

module.exports = { userRegistrationValidation, loginValidation };
