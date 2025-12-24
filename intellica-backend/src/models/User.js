import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    otp: String,
    otpExpiry: Date,

    // New fields for profile
    education_level: { type: String, default: "" },  // Degree
    specialization: { type: String, default: "" },   // Interest / Specialization
    learning_style: { type: String, default: "" },   // Learning Type
    budget: { type: Number, default: 0 },            // Budget

    completedCourses: [{ type: String }],           // Completed courses
    inProgressCourses: [{ type: String }],          // In-progress courses
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
