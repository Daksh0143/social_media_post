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
router.post("/delete/:postId", userAuth, deleteComment);
router.post("/toggle-comment/:postId", userAuth, toggleComment);
router.get("/getAll/:postId",getAllComment)

module.exports = router;
