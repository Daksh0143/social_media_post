const Post = require("../model/post.schema");
const {
  successResponse,
  failureResponse,
} = require("../helper/api.helper.response");

const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return failureResponse({ res, message: "Provide all the field" });
    }
    console.log("req.user : ", req.user);
    const user = req.user;
    console.log(req.user, "Users");
    const data = await Post.create({
      posts: "text",
      description,
      title,
      createdBy: user.id,
    });
    console.log(data, "Data");
    return successResponse({ res, message: "Post created Successfully", data });
  } catch (error) {
    console.log("Error", error);
    return failureResponse({ res, message: "Internal server error" });
  }
};

const getAllPost = async (req, res) => {
  try {
    const data = await Post.find();
    return successResponse({ res, message: "Get all the Postes", data });
  } catch (error) {
    console.log("Error", error);
    return failureResponse({ res, message: "Internal server error " });
  }
};

const updatePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Post.findByIdAndUpdate(id, req.body);
    return successResponse({ data, message: "Post Update Successfully", res });
  } catch (error) {
    return failureResponse({ res, message: "Internal Server Error" });
  }
};

const deletePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Post.findByIdAndDelete(id);
    return successResponse({ data, res, message: "Post Deleted Successfully" });
  } catch (error) {
    return failureResponse({ data, res, message: "Internal Server Error" });
  }
};

module.exports = { createPost, getAllPost, updatePosts, deletePosts };
