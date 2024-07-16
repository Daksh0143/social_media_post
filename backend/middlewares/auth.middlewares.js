const jwt = require("jsonwebtoken");
const {
  failureResponse,
  successResponse,
} = require("../helper/api.helper.response");
const User = require("../model/user.schema");

require("dotenv").config({ path: "../.env" });

const secretKey = process.env.JWT_SECRET_KEY;

const userAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return failureResponse({ res, message: "Token is not available" });
  }
  try {
    const tokenWithoutBearer = token.substring(7);
    if (!tokenWithoutBearer) {
      return failureResponse({ res, message: "Token is not withoutr Bearer" });
    }
    // jwt.verify(
    //   tokenWithoutBearer,
    //   secretKey,
    //   (err, user) => {
    //     if (err) {
    //       console.log("Error",err)
    //       return failureResponse({
    //         res,
    //         statusCode: 403,
    //         message: "Forbidden Error",
    //       });
    //     }
    //     req.user = { user };
    //     next();
    //   }
    // );

    await jwt.verify(tokenWithoutBearer, secretKey, (err, user) => {
      if (err) {
        console.log("Error While Getting Token", err);
        return failureResponse({ res, message: "Forbidden Error" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return failureResponse({
      res,
      message: "Internal Error",
    });
  }
};
module.exports = { userAuth };
