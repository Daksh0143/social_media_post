const express=require("express")
const router=express.Router()
const {toggleLike} =require("../controller/like.controller")
const {userAuth}=require("../middlewares/auth.middlewares")

// router.post("/post-like/:postId",userAuth,postLike)
// router.post("/remove-like/:post",userAuth,removeLike)
router.post("/toggleLike",userAuth,toggleLike)


module.exports=router