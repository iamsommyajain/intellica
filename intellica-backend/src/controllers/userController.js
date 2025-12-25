import User from "../models/User.js";
import nodemailer from "nodemailer";


console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);





/* REGISTER */
export const registerUser = async (req, res) => {
  try {
    const { name, email, education_level, specialization, learning_style, budget } = req.body;

    // Simple validation
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Create user (password is optional if not needed)
    const user = await User.create({
  name,
  email,
  otp,
  otpExpiry: Date.now() + 10 * 60 * 1000,
  education_level,
  specialization,
  learning_style,
  budget,
});

    console.log(`Generated OTP for ${email}: ${otp}`); // Debug

    // Send OTP
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Intellica Email Verification OTP",
      text: `Hello ${name},\n\nYour OTP for Intellica registration is: ${otp}\nIt expires in 10 minutes.`,
    });

    res.status(201).json({
      message: "OTP sent to email",
      user_id: user._id,
    });

  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

/* VERIFY OTP */
export const verifyOTP = async (req, res) => {
  try {
    const { user_id, otp } = req.body;

    if (!user_id || !otp) {
      return res.status(400).json({ message: "User ID and OTP are required" });
    }

    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Send correct user ID
    res.json({ 
      message: "Email verified successfully",
      userId: user._id, // use _id here
    });

  } catch (error) {
    console.error("Error in verifyOTP:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};


/* LOGIN WITH OTP */
export const loginWithOTP = async (req, res) => {

  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
}); 

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please register." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Intellica Login OTP",
      text: `Your login OTP is ${otp}. It expires in 10 minutes.`,
    });

    res.json({
      message: "OTP sent for login",
      user_id: user._id,
    });

  } catch (error) {
    console.error("Login OTP Error:", error);
    res.status(500).json({ message: "Login OTP failed" });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -otp");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
