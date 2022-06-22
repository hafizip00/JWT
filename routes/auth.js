const router = require("express").Router();
const User = require("../Models/User");
const registerSchema = require('../validation')
const loginValidation = require('../validation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post("/register", async (req, res) => {

  // validate before adding to DB
  const {error} = registerSchema(req.body);

  const emailExist = await User.findOne({email : req.body.email})
  if (emailExist) {
    return res.status(400).send("Already Exist")
  }

  if (error) {
      return res.status(400).send(error.details[0].message)
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password , salt)
  console.log(hashedPassword)
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.json("ERROR");
  }
});


router.post('/login' ,async (req, res)=>{
  const {error} = loginValidation(req.body)
  if(error){
    return res.status(403).send(error.details[0].message)
  }
  const user = await User.findOne({email : req.body.email});
  if (!user) {
    res.status(500).json("Email Or password is Wrong")
  }
  try {
  const isPasswordCorrect = await bcrypt.compare(req.body.password ,user.password)
  if(isPasswordCorrect){
    //Create and assign a Token

    const token = jwt.sign({_id : user._id} , process.env.TOKEN_SECRET)
    res.header("auth-token" , token).json(token)

    // res.status(200).json(user)
  }else{
    res.status(500).json("Credientials mismatch")
  }
  } catch (error) {
    res.status(400).json("Some error Occurred")
  }
})

module.exports = router;
