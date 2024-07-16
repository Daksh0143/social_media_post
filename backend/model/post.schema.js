const mongoose = require("mongoose");
const comment = require("./postComment.schema");
const like = require("./postLike.schema");

const postSchema = mongoose.Schema(
  {
    posts: {
      type: String,
      enum: ["img", "text", "video", "file"],
      required:true
    },
    title:{
        type:String,
        required:true
    },
    postPicture: {
      type: String,
    },
    postLike: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "likes",
    }],
    description: {
      type: String,
      required:true
    },
    postComment: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timeStamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
