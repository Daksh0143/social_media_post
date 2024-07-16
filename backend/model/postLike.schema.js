const mongoose=require("mongoose")

const likeSchema=mongoose.Schema({
    type:{
        type:String,
        enum:["like","dislike"]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts"
    },
},{timeStamps:true})

const like=mongoose.model("like",likeSchema)

module.exports=like