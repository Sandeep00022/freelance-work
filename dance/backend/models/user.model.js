import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Email must be at least 5 characters long"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "instructor", "admin"],
      default: "user",
    },
    image: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.UMkJqFAUFzD3B7yrL-OfJwHaEK?rs=1&pid=ImgDetMain",
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return bcryptjs.compare(password, this.password);
};
userSchema.statics.hashPassword = async function (password) {
  return bcryptjs.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
