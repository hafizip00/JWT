const Router = require('express').Router();
const verify = require('./verifyToken')


Router.get('/' ,verify, (req , res)=>{
    res.status(200).send({
        title : "MY POST",
        desc : "This is post whicvh you can;t acces without token",
        USER : req.user
    })
})

module.exports = Router;