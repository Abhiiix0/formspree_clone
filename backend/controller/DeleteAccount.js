import bcrypt from "bcryptjs"; // Assuming bcrypt is used for hashing passwords
import FormModel from "../model/FormModel.js";
import UserModel from "../model/UserModel.js";
import SubmissionModel from "../model/SubmissionModel.js";

export async function DeleteAccount(req, res) {
  const { id } = req.user; // Get user ID from request
  const { deletePassword } = req.body; // Get password from request body
  console.log(deletePassword);
  try {
    // Check if the user exists
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found.",
      });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(deletePassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: true,
        message: "Incorrect password. Account deletion failed.",
      });
    }

    // Delete all forms associated with the user
    await FormModel.deleteMany({ userId: id });

    // Delete all submissions associated with the user's forms
    await SubmissionModel.deleteMany({ userId: id });

    // Delete the user account
    await UserModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Account and all data deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}
