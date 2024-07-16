const Comment = require("../model/postComment.schema");
const {
  failureResponse,
  successResponse,
} = require("../helper/api.helper.response");
const PostModel = require("../model/post.schema");
const { Types } = require("mongoose");

const postComment = async (req, res) => {
  const postId = req.body.post;
  console.log("Post id", postId);
  console.log(req.user, "User");
  const user = req.user.id;
  console.log("UserId", req.body);
  const { content } = req.body;
  if (!content) {
    return failureResponse({ res, message: "Content is required" });
  }
  try {
    const data = await Comment.create({
      content,
      user,
      post: new Types.ObjectId(postId),
    });
    console.log("data", data, new Types.ObjectId(postId));
    const post = await PostModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(postId),
      },
      {
        $addToSet: {
          postComment: data._id,
        },
      },
      { new: true }
    );
    console.log("Post", post);
    console.log("data", data);
    if (!post) {
      return failureResponse({ res, message: "Post is not available" });
    }
    return successResponse({
      res,
      message: "Comment Posted Successfully",
      data,
    });
  } catch (error) {
    console.log("error", error);
    return failureResponse({ res, message: "Internal Server Error" });
  }
};

const deleteComment = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.user.id;

  const comment = await Comment.findOneAndDelete({
    post: postId,
  });
  console.log("Comment", comment);
  if (!comment) {
    return failureResponse({
      res,
      message: "You have not comment on this post",
    });
  }
  const posts = await Post.findByIdAndUpdate(
    postId,
    {
      $pull: {
        postComment: comment._id,
      },
    },
    { new: true }
  );

  if (!posts) {
    return failureResponse({ res, message: "Post not found" });
  }
  return successResponse({
    res,
    data: comment,
    message: "Comment Delete Successfully",
  });
};

const toggleComment = async (req, res) => {
  const { postId } = req.params;
  const user = req.user.user.id;
  try {
    const existingComment = await Comment.findOne({ post: postId, user });
    // Delete Comment from Comment
    if (existingComment) {
      await Comment.findOneAndDelete({ post: postId, user });

      // Delete Comment from post
      const post = await Post.findByIdAndUpdate(postId, {
        $pull: {
          postComment: existingComment._id,
        },
      });
      if (!post) {
        return failureResponse({ res, message: "Post is not found" });
      }
      return successResponse({
        res,
        message: "Comment Deleted Successfully",
        data: post,
      });
    } else {
      const { content } = req.body;
      // Add Comment into the Comment
      const newComment = await Comment.create({
        content,
        user,
        post: postId,
      });
      // Update comment into the post
      const post = await Post.findByIdAndUpdate(postId, {
        $addToSet: { postComment: newComment._id },
      });

      if (!post) {
        return failureResponse({ res, message: "Post is not found" });
      }

      return successResponse({ res, message: "Comment Added Successfully" });
    }
  } catch (error) {
    console.log("Error", error);
    return failureResponse({ error, message: "Internal Server Error" });
  }
};

const getAllComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const data = await Comment.find({ post: postId });
    console.log("data", data);
    return successResponse({ res, message: "Get all the Post", data });
  } catch (error) {
    console.log("Error", error);
    return failureResponse({ error, message: "Internal Server Error" });
  }
};
module.exports = { postComment, deleteComment, toggleComment, getAllComment };
