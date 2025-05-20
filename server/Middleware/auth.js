//This File has been added for future developments to improve authentication between routes
//Middleware/auth.js

import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  // Check for token in Authorization header
  const authHeader = req.headers['authorization'];
  const tokenFromHeader = authHeader && authHeader.split(' ')[1];
  
  // Check for token in cookies
  const tokenFromCookie = req.cookies.token;

  // Use token from header if available, otherwise use cookie
  const token = tokenFromHeader || tokenFromCookie;
  
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};