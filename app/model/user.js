const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:6
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    accountNumber:{
        type:String,
        required:true,
        unique:true
    },
    balance:{
        type:Number,
        required:true,
        default:0
    }
})

module.exports=mongoose.model('user',userSchema);