import express from "express";

import authorize from "../middlewares/userAuthorize.js";
import {
  applyToBecomeMentor,
  getMentorApplicationById,
  getMentorApplications,
  updateMentorApplicationStatus,
} from "../controllers/becomeMentor.controller.js";
import { authUser } from "../middlewares/userAuth.js";

const router = express.Router();

// Route for users to apply to become a mentor
router.post("/apply", authUser, applyToBecomeMentor);

// Route for admins to get the list of mentor applications
router.get("/applications", authUser, authorize(["admin"]), getMentorApplications);

// Route to get details of a specific mentor application
router.get("/applications/:id", authUser, authorize(["admin"]), getMentorApplicationById);

// Route for admins to update application status
router.put(
  "/applications/:id/status",
  authUser,
  authorize(["admin"]),
  updateMentorApplicationStatus
);

export default router;
