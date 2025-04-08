import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";

export const isAuthenticated = catchAsyncErrors((req, res, next) => {
        const token = req.cookies?.token;
        if (!token) res.status(404).json({ messsage: "No token found. Please login.", success: false });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
});