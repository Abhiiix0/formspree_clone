import bcrypt from "bcryptjs"; // To hash and compare passwords
import User from "../model/UserModel.js"; // Assuming you have a User model

export async function UserDetailUpdate(req, res) {
  // console.log(req.user);
  const { id } = req.user; // Assuming userId is retrieved from a verified token/session
  const { name, email, oldPassword, newPassword } = req.body;
  console.log(req.body);
  try {
    // Fetch the user from the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let messages = [];

    // Update email if provided
    if (email && email !== user.email) {
      user.email = email;
      messages.push("Email updated successfully.");
    }

    // Update name if provided
    if (name && name !== user.name) {
      user.name = name;
      messages.push("Name updated successfully.");
    }

    // Check and update password if oldPassword and newPassword are provided
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Old password is incorrect", error: true });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      messages.push("Password updated successfully.");
    }

    // Save the updated user to the database
    await user.save();

    // Send appropriate response based on what was updated
    if (messages.length === 0) {
      return res
        .status(200)
        .json({ message: "No updates made.", success: true });
    }

    return res.status(200).json({ message: messages[0], success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error?.message || error, error: true });
  }
}
