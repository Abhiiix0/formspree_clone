import UserModel from "../model/UserModel.js";

export async function UserDetail(req, res) {
  try {
    const { id } = req.user;
    const user = await UserModel.findById(id).select("-password -active -otp");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      data: user,
      message: "User details fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
}
