const jwt=require("jsonwebtoken")

const authMiddelware=async (req,res,next)=>{
const token=req.headers.authorization?.split(" ")[1]
if(token){
    try {
        const decode=jwt.verify(token,"Telegram");
        if(decode){
            req.body.userID=decode.userID;
            next()
        }
        else{
            res.json("Not Authorized")
        }
    } catch (error) {
        res.json({err:"error"})
    }
}
else{
    res.json({msg:"Please Login"})
}
}

module.exports=authMiddelware