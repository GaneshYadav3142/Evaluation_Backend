const express=require("express")
const mongoose=require("mongoose")
const authMiddelware = require("../authMiddelware")
const postModel = require("../Model/postModel")
const postRouter=express.Router()

postRouter.post("/add",async(req,res)=>{
    console.log(req.body)
   // const token=req.headers.authorization?.split(" ")[1]
    try {
        const newpost=await postModel(req.body)
        newpost.save()
        res.status(200).send({msg:"post created"})
    } catch (error) {
        res.status(400).send({error:"error"})
    }
})

postRouter.get("/", async (req, res) => {
    const { device, userID } = req.query; 
    try {
        if (device) {
            const posts = await postModel.find({ userID: userID, device });
            console.log(posts);
            res.status(200).send(posts);
        } else {
          
            const filter = userID ? { userID: userID } : {};
            const posts = await postModel.find(filter);
            console.log(posts);
            res.status(200).send(posts);
        }
    } catch (error) {
        res.status(400).send({ error: error.message }); 
    }
});




postRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatepost = await postModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!updatepost) {
       
            return res.status(404).send({ error: "Post not found" });
        }

        res.status(200).send(updatepost);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

postRouter.delete("/delete/:id",async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1]
    const id=req.params.id
    try {
     await postModel.findByIdAndDelete(id)
        res.status(200).send({msg:"post Deleted"})
    } catch (error) {
        res.status(400).send({error})
    }
})








module.exports=postRouter