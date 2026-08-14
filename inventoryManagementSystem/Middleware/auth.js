const jwt = require("jsonwebtoken");

// Middleware to verify token
exports.protect = (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decode;
    nextTick();
  } catch (error) {
    return res.status(401).json({ message: "Not authorization, token failed" });
  }
};
