import UserModel from "../model/UserModel.js";

export async function OtpVerify(req, res) {
  const { otp, email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Account not found" });
  }
  if (user?.otp === otp) {
    const updateStatus = await UserModel.findOneAndUpdate(
      {
        email: email,
      },
      {
        $set: {
          otp: null,
          active: true,
        },
      }
    );
    await updateStatus.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
}
