import BecomeMentor from "../models/becomeMentor.model.js";
import userModel from "../models/user.model.js";

export const applyToBecomeMentor = async (req, res) => {
  try {
    const { certificateDriveLink, danceType, experience } = req.body;
    const userId = req.user.id;

    if (!certificateDriveLink || !danceType || experience === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user has already applied
    const existingApplication = await BecomeMentor.findOne({ userId });

    if (existingApplication) {
      if (
        existingApplication.status === "inprogress" ||
        existingApplication.status === "approved"
      ) {
        return res.status(400).json({
          message: "You have already applied. Please wait for approval.",
        });
      } else if (existingApplication.status === "rejected") {
        // Allow reapplication by updating the existing application
        existingApplication.certificateDriveLink = certificateDriveLink;
        existingApplication.danceType = danceType;
        existingApplication.experience = experience;
        existingApplication.status = "inprogress"; // Reset status
        await existingApplication.save();
        return res.status(200).json({
          message: "Reapplication submitted successfully",
          application: existingApplication,
        });
      }
    }

    // Create a new application if no previous one exists
    const application = new BecomeMentor({
      certificateDriveLink,
      danceType,
      experience,
      userId,
      status: "inprogress", // Default status
    });

    await application.save();
    res
      .status(201)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMentorApplications = async (req, res) => {
  try {
    const applications = await BecomeMentor.find().populate("userId");
    res
      .status(200)
      .json({ message: "List of mentor applications", applications });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMentorApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await BecomeMentor.findById(id).populate("userId");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res
      .status(200)
      .json({ message: "Mentor application details", application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updateMentorApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status value
    if (!["inprogress", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find application
    const application = await BecomeMentor.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update status
    application.status = status;
    await application.save();

    // If approved, update user's role
    if (status === "approved") {
      const user = await UserModel.findById(application.userId);
      if (user) {
        user.role = "instructor";
        await user.save();
      }
    }

    return res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error("Error updating mentor application status:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

