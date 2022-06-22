const express = require('express');
const userRoute = require('./routes/auth')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const postRoute = require('./postRoute')
const app = express();

app.use(express.json())

app.use("/api/user" , userRoute);
app.use('/api/post' , postRoute)

dotenv.config()
const DB_CONNECT = process.env.DB_CONNECT
mongoose.connect(
    DB_CONNECT,
()=>{
    console.log("Connected to Cloud Database")
})



app.listen(3000 , ()=>{
    console.log("Server is UP and running..")
})