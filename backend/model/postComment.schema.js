const mongoose=require("mongoose")

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
        
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:true
        
    },
},{timestamps:true})

const comment=mongoose.model("comment",commentSchema)

module.exports=comment