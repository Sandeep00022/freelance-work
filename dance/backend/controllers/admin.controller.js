import userModel from "../models/user.model.js";

// Update User Role (Admin Only)
export const updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    // Check if the role is valid
    const validRoles = ["user", "instructor", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Find the user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the role
    user.role = role;
    await user.save();

    res.status(200).json({ message: `User role updated to ${role}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


