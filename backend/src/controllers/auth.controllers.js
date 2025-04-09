import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const createUser = catchAsyncErrors(async (req, res, next) => {
  const hashedPassword = await bcrypt.hash("Test123", 10);
    const user = new User({
      email: "intern@dacoid.com",
      password: hashedPassword,
    });
    await user.save();
    const token = user.generateAndSaveToken(res);
    res
      .status(202)
      .json({ message: "User created successfully", success: true, token });
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(404).json({ messsage: "User not found", success: false });
  const user = await User.findOne({ email }).select("+password");
  if (!user)
    res.status(404).json({ messsage: "User not found", success: false });
  const isValid = await user.comparePassword(password);
  if (!isValid)
    res.status(404).json({ messsage: "Wrong password", success: false });

  const token = await user.generateAndSaveToken(res);
  return res
    .status(202)
    .json({ message: "Login successful", user, success: true, token });
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  if (!req.user)
    res.status(202).json({ message: "You are not logged in.", success: false });
  res.clearCookie("token");
  res.status(202).json({ message: "Logout successfull", success: false });
});

export const fetchUser = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    res.clearCookie("token");
    return res.status(401).json({
      message: "Please login to continue.",
      success: false,
    });
  }

  return res.status(200).json({
    message: "User fetched successfully.",
    user: req.user,
    success: true,
  });
});
