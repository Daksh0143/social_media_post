const Like = require("../model/postLike.schema");
const Post = require("../model/post.schema");
const {
  failureResponse,
  successResponse,
} = require("../helper/api.helper.response");
const { default: mongoose } = require("mongoose");

const toggleLike = async (req, res) => {
  const  postId  = req.body.postId;
  console.log("Body",req.body)
  const user = req.user.id;

   

  console.log("Post Id",postId,user)
  
  try {
    const existingLike = await Like.findOne({  post: postId,userId: user });
    if (existingLike) {
      //Remove like from the Like
      await Like.findOneAndDelete({ userId: user, post: postId, type: "like" });

      //remove Like from the post
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: {
            postLike: existingLike._id,
          },
        },
        { new: true }
      );

      console.log("Post",post)

      if (!post) {
        return failureResponse({ res, message: "Post is not found" });
      }
      return successResponse({
        res,
        message: "Like remove Successfully",
        data: { post, like: existingLike },
      });
    } else {
      //Create a like into the like
      const newLike = await Like.create({
        type: "like",
        userId: user,
        post: postId,
      });

      // Update the like into the post schema
      const post = await Post.findByIdAndUpdate(postId, {
        $addToSet: { postLike: newLike._id },
      },{new:true});

      if(!post){
        return failureResponse({res,message:"Post not found"})
      }

      return successResponse({res,message:"like added successfully",data:{post,like:newLike}})
    }
  } catch (error) {
    console.log("Error",error)
    return failureResponse({res,message:"Internal Server Error"})
  }
};
module.exports = { toggleLike };
