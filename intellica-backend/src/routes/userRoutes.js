import express from "express";
import { registerUser, verifyOTP, loginWithOTP} from "../controllers/userController.js";
import User from "../models/User.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginWithOTP); 
router.post("/verify_otp", verifyOTP);

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -otp -otpExpiry");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
