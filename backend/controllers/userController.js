import userModel from "../models/userModel.js";

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password"); 
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Failed to fetch user", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export {getCurrentUser}