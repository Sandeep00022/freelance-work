import mongoose from "mongoose";

const danceCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  difficultyLevel: { 
    type: String, 
    enum: ["Beginner", "Intermediate", "Advanced"], 
    required: true 
  },
  timeInterval: { type: String, required: true } 
}, { timestamps: true });

const DanceCategory = mongoose.model("DanceCategory", danceCategorySchema);

export { DanceCategory };
