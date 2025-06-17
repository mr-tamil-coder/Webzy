const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  email: { type: String, unique: true, required: true },
  emailVerified: Boolean,
  firstName: String,
  lastName: String,
  fullName: String,
  profilePicture: String,
  // token: number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};
// Update the updatedAt field before saving
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
