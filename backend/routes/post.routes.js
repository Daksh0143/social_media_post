const express=require("express")
const router=express.Router()
const {createPost,getAllPost,updatePosts,deletePosts} =require("../controller/post.controller") 
const {createPosts} =require("../validation/post.validation")
const {userAuth}=require("../middlewares/auth.middlewares")

router.post("/create",userAuth,createPosts,createPost)
router.get("/getAll",getAllPost)
router.put("/update/:id",updatePosts)
router.delete("/delete/:id",deletePosts)


module.exports=router