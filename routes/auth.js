const router = require("express").Router();
const User = require("../Models/User");

//VALIDATION

const Joi = require("@hapi/joi");

const schema = Joi.object({
  username: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {
  // validate before adding to DB

  const {error} = schema.validate(req.body);

  if (error) {
      return res.status(400).send(error.details[0].message)
  }
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.json("ERROR");
  }
});

module.exports = router;
