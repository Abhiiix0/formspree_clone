import UserModel from "../model/UserModel.js";
import bcryptjs from "bcryptjs";
export async function ResetPassword(req, res) {
  const { email, newPassword, oldPassword } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is missing", error: true });
  }
  // Check if newPassword and oldPassword are provided
  if (!newPassword || !oldPassword) {
    return res.status(400).json({
      message: "New password or old password is missing",
      error: true,
    });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    // Check if old password is correct
    const isValidPassword = await bcryptjs.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: "Old password is incorrect", error: true });
    }
    // Hash new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    // Update user password
    user.password = hashedPassword;
    await user.save();
    // send res back to user
    return res
      .status(200)
      .json({ message: "Password update successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error?.message || "Internal Server Error",
      error: true,
    });
  }
}
