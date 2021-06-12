const mongoose=require('mongoose');
const historySchema=new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    sender:{
        type:String,
        required:true
    },
    receipent:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
},{ timestamps:true})

module.exports=mongoose.model('history',historySchema)