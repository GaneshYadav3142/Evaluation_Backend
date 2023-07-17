const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const mongoose=require("mongoose")
const userData = require("./db")
const userRouter = require("./Router/userRouter")
const authMiddelware = require("./authMiddelware")
const postRouter = require("./Router/postRouter")
const app=express()
dotenv.config()


//app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use(authMiddelware)
app.use("/posts",postRouter)


app.listen(8080,async()=>{
    try {
        userData()
        console.log("Connected")
    } catch (error) {
        console.log(error)
    }
})


