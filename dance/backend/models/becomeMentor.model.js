import mongoose from "mongoose";

const becomeMentorSchema = new mongoose.Schema(
  {
    certificateDriveLink: {
      type: String,
      required: true,
      trim: true,
    },
    danceType: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      enum: ["inprogress", "approved", "rejected"],
      default: "inprogress",
    },
  },
  {
    timestamps: true,
  }
);

const BecomeMentor = mongoose.model("BecomeMentor", becomeMentorSchema);

export default BecomeMentor;
