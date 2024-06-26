const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter User Name"],
    maxLength: [30, "Top Limit : 30 characters"],
    minLength: [4, "Bottom Limit : 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minLength: [6, "Password should be greater then 5 letters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    public_url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Generate JWT and save in request
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetToken = (async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire  = Date.now()+15*60*1000;

    return resetToken;
});

module.exports = mongoose.model("User", userSchema);
