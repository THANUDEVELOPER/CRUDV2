const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "eThWmZq4t7w!z%C*F)J@NcRfUjXn2r5u");
    const { userId, name } = decoded;
    req.user = { userId, name };
    next();
  } catch (error) {
    res.status(401).send("Not authorized to access this route");
  }
};

module.exports = authentication;
