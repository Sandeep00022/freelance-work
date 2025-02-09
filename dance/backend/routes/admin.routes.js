import express from "express";
import { updateUserRole } from "../controllers/admin.controller.js";

import { authUser } from "../middlewares/userAuth.js";
import authorize from "../middlewares/userAuthorize.js";

const router = express.Router();

// Route to update user role (Admin only)
router.put("/update-role", authUser, authorize(["admin"]), updateUserRole);


export default router;
