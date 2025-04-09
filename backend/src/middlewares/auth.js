import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";


export const isAuthenticated = (req, res, next) => {
  try {
    const token = req?.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token found. Please login.", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token.", success: false });
  }
};
