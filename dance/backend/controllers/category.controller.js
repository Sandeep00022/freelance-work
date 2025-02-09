import { DanceCategory } from "../models/category.model.js";


// Fetch all dance categories
export const getDanceCategories = async (req, res) => {
  try {
    const categories = await DanceCategory.find();

    res.status(200).json({
      message: "Dance categories fetched successfully",
      categories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Admin-only: Add a new dance category
export const addDanceCategory = async (req, res) => {
  try {
    const { name, image, difficultyLevel, timeInterval } = req.body;
    // Validate required fields
    if (!name || !image || !difficultyLevel || !timeInterval) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if category already exists
    const existingCategory = await DanceCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Dance category already exists" });
    }

    // Create new dance category
    const category = new DanceCategory({
      name,
      image,
      difficultyLevel,
      timeInterval,
    });
    await category.save();

    res
      .status(201)
      .json({ message: "Dance category added successfully", category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
