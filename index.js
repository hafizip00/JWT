const express = require('express');
const userRoute = require('./routes/auth')
const app = express();


app.use("/api/user" , userRoute);


app.listen(3000 , ()=>{
    console.log("Server is UP and running..")
})