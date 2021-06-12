const User=require('../app/model/user');
const History=require('../app/model/history')
const router=require('express').Router();

router.post("/:id",async (req,res)=>{
    const id=req.params.id;
    const receipentId=req.body.userId;
    try{
        const sender=await User.findById(id);
        const receipent=await User.findById(receipentId);
        
        const amount=parseInt(req.body.amount,10);
        if(amount>sender.balance)
        {
            const historyFailed=await new History({
                amount:amount,
                sender:sender.username,
                receipent:receipent.username,
                status:"Failed"
            })
            await historyFailed.save();
            return res.status(205).send("Insufficient Balance");
        }
        await User.updateOne({email:sender.email},{balance:sender.balance-amount});
        await User.updateOne({email:receipent.email},{balance:receipent.balance+amount});
        const history=await new History({
            amount:amount,
            sender:sender.username,
            receipent:receipent.username,
            status:"Successful"
        })
        await history.save();
        return res.status(200).json({status:"Transaction Successfully",history});
    }
    catch(error)
    {
        return res.status(500).send(error.message)
    }
})

router.get("/history",async (req,res)=>{
    try{
        const allHistory=await History.find().sort({createdAt:-1});
        return res.status(200).json(allHistory)
    }
    catch(error){
        return res.starus(500).send(error.message)
    }
})
module.exports=router;