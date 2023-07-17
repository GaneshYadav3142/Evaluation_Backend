const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userModel = require("../Model/userModel")
const userRouter=express.Router()


userRouter.post("/register",async(req,res)=>{
    try {
        const {name,email,password,gender}=req.body
        const userExist=await userModel.findOne({email})
        if(userExist) {
            res.status(400).send("User Already exist")
        }
        else{
            const newPassword=await bcrypt.hash(password,10)
            console.log(newPassword)
            const user=await userModel.create({name,email,password:newPassword,gender})
            user.save()
            res.status(200).send({msg:"The new User has been added"})
        }
    } catch (error) {
        res.status(400).send({error:"error"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
         const user=await userModel.findOne({email})
         console.log(user)
         if(user){
        const verify=await bcrypt.compare(password,user.password)
        if(!verify){
            res.status(400).send("Incorrect Password")
        }
        else{
            const token=jwt.sign({userID:user._id},"Telegram",{expiresIn:"1d"})
            res.status(200).send({token})
        }
    }
    else{
        res.status(400).send({error:"User not found"})
    }

    } catch (error) {
        res.status(400).send({error:"error"})
    }
})


module.exports=userRouter