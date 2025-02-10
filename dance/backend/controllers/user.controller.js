// local modules
import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import { createUser } from "../services/user.service.js";

// register
export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;

  const userAlreadyExists = await userModel.findOne({ email });
  if (userAlreadyExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await userModel.hashPassword(password);
  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};

// login
export const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.cookie("access_token", token);
  console.log("users", user);
  res.status(200).json({ token, user });
};

export const logOut = (req, res, next) => {
  res.clearCookie("access_token").status(200).json("User has been signed out");
};

export const getInstructors = async (req, res) => {
  try {
    const instructors = await userModel
      .find({ role: "instructor"  })
      .select("-password");

    if (instructors.length === 0) {
      return res.status(404).json({ message: "No instructors found" });
    }

    res.status(200).json({
      message: "Instructors fetched successfully",
      instructors,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const createUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, role, image } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash password using static method from model
    const hashedPassword = await userModel.hashPassword(password);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
      image: image || userModel.schema.path("image").defaultValue, // Use default if no image is provided
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
