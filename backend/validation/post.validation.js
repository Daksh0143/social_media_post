const Joi = require("@hapi/joi");
const { failureResponse } = require("../helper/api.helper.response");

const createPosts = async (req, res, next) => {
  const schema = Joi.object().keys({
    // posts: Joi.string().required(),
    title: Joi.string().required(),

    // postPicture:Joi.object(),
    // postLike:Joi.object(),
    description: Joi.string().required(),
    // postComment:Joi.string(),
    // createdBy:Joi.object()
  });
  const value = schema.validate(req.body);
  if (value.error) {
    console.log(value.error, "Value.error");
    return failureResponse({
      res,
      message: "Something Wen wrong",
      statusCode: 500,
    });
  }
  next();
};

module.exports = { createPosts };
