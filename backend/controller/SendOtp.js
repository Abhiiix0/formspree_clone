import nodemailer from "nodemailer";
import UserModel from "../model/UserModel.js";
export async function SendOtp(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required.");
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: true,
      });
    }
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    //set otp in user
    user.otp = otp;
    await user.save();

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      service: "Gmail",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: "goodtimes4info@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "goodtimes4info@gmail.com",
      to: email,
      subject: "Forget Password OTP Code",
      text: `Your OTP is ${otp}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Failed to send OTP", error: true });
      }
    });

    res.status(200).send("OTP sent to your email.");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
}
