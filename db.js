const mongoose=require("mongoose")
const userData=async()=>await mongoose.connect("mongodb+srv://Ganesh:Yadav@cluster0.z7f4ecg.mongodb.net/SocialMedia?retryWrites=true&w=majority")

module.exports=userData