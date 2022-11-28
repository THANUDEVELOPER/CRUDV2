const loginSchema = require("../models/loginSchema");
// REGISTER
const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).send("Bad request");
    }
    // if the user send the password as encoded below code helps
    const encoded = Buffer.from(password, "base64").toString("binary");
    const decoded = Buffer.from(encoded).toString("base64");
    if (decoded === password) {
      password = Buffer.from(password, "base64").toString("binary");
    }

    const register = await loginSchema.create({ ...req.body, password });
    // const token = register.createJWT();
    // res.status(200).send({ user: { name: register.name, token } });
    res.status(200).send({
      user: { name: register.name, msg: "User created" },
    });
  } catch (err) {
    if (!err) {
      res.status(500).send("Something went wrong!");
    } else {
      console.log(err);
    }
  }
};
// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("provide email and password");
    }
    const user = await loginSchema.findOne({ email });
    if (!user) {
      res.status(400).send("User not found");
    }
    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
      res.status(400).send("Invalid password");
    }
    const token = user.createJWT();
    res.status(200).send({ user: { name: user.name, token } });
  } catch (err) {}
};
module.exports = {
  login,
  register,
};
