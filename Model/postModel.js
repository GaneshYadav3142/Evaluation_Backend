

const mongoose=require("mongoose")
const postSchema=new mongoose.Schema({
    UserID:String,
    title : String,
    body : String,
    device :String
})

const postModel=mongoose.model("Post",postSchema)

module.exports=postModel