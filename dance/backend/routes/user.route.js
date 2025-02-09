import express from "express";
import {
  createUserByAdmin,
  getInstructors,
  loginUser,
  logOut,
  registerUser,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/userAuth.js";
import { createUser } from "../services/user.service.js";
import authorize from "../middlewares/userAuthorize.js";

const router = express.Router();

// User signup route
router.post("/signup", registerUser);

// User login route
router.post("/login", loginUser);

// User logout route
router.get("/logout", logOut);

router.get("/instructors", authUser, getInstructors);
router.post("/create-user", authUser, authorize(["admin"]), createUserByAdmin);

export default router;
