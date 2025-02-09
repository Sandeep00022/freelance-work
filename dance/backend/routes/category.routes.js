import express from "express";
import { addDanceCategory, getDanceCategories } from "../controllers/category.controller.js";
import { authUser } from "../middlewares/userAuth.js";
import authorize from "../middlewares/userAuthorize.js";

const router = express.Router();

// Admin-only route to add dance category
router.post("/add", authUser, authorize(["admin"]), addDanceCategory);
router.get("/list", getDanceCategories);

export default router;
