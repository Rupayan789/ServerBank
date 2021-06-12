const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const cors=require('cors')
const userRoute=require('./routes/user')
const transactRoute=require('./routes/transact')
const app=express();
app.use(cors())
const PORT=3030 || process.env.PORT;
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true
}).then(()=>{
    console.log("Database connected")
}).catch(error=>console.log(error))

app.use(express.json())

app.use("/user",userRoute);
app.use("/transact",transactRoute)
app.listen(PORT,()=>{
    console.log("Server started");
})