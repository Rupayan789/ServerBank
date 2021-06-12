const User=require('../app/model/user')
const randomize=require('randomatic')
const router=require('express').Router();
router.get("/",async (req,res)=>{
    try
    {
        const users=await User.find();
        return res.status(200).json(users);
    }
    catch(error)
    {
        return res.status(500).send(error.message)
    }
    
})
router.post("/",async (req,res)=>{
    try{
    var {username,email,balance}=req.body;
    
        const accountNumber=randomize('0',12);
        balance=parseInt(balance)
        const user=await new User({
            username:username,
            email:email,
            balance:balance,
            accountNumber:accountNumber
        })
        
        await user.save();
        return res.status(200).json(user);
    }
    catch(error){
        console.log(error)
        return res.status(210).send(error.message)
    }
})
router.get("/:id",async (req,res)=>{
    const id=req.params.id;
    try{
        const user=await User.findById(id);
        return res.status(200).json(user);
    }
    catch(error)
    {
        return res.status(500).send(error.message)
    }
})

module.exports=router;