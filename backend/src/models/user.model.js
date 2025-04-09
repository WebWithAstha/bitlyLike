import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true, select: false }, // hashed
});
userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};
userSchema.methods.comparePassword = async  function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAndSaveToken = async function (res) {
  const payload = { id: this._id, email: this._email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: "production",
    // secure:true,
    sameSite: "None", 
    maxAge:  parseInt(process.env.COOKIE_MAX_AGE),
  });
  console.log("cookie set")
  return token;
};

const User  = mongoose.model("User", userSchema);
export default User;