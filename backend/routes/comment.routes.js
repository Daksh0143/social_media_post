const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth.middlewares");
const {
  postComment,
  deleteComment,
  toggleComment,
  getAllComment
} = require("../controller/comment.controller");

router.post("/", userAuth, postComment);
router.delete("/delete/:postId/:commentId", userAuth, deleteComment);
router.post("/toggle-comment/:postId", userAuth, toggleComment);
router.get("/getAll/:postId",getAllComment)

module.exports = router;
