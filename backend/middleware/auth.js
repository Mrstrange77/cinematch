const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Token comes in the Authorization header as "Bearer <token>"
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // attach user ID to request for use in routes
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};