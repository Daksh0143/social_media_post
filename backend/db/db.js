const mongoose=require("mongoose")


const dbConnect=mongoose.connect("mongodb://localhost:27017/",{
    dbName:"CRUD_Demo"
}).then((result)=>{
    console.log("DB Connection Successfully")
}).catch((error)=>{
    console.log("Error Occured",error)
})

module.exports=dbConnect