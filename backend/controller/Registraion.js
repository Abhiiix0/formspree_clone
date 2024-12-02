import UserModel from "../model/UserModel.js";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}

export async function Registration(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(499).json({ message: "Please fill all the fields." });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const otp = generateOtp();
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = new UserModel({ name, email, password: hashedPassword, otp });
    await user.save();
    const createTransport = nodemailer.createTransport({
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
      subject: "Your One-Time Password (OTP) for Account Verification",
      text: `Hello,
      
    Your One-Time Password (OTP) for verifying your account is: ${otp}
      
    Please use this OTP to complete your registration. Do not share this code with anyone for security reasons.
      
    If you did not request this, please ignore this email.
      
    Thank you.`,
    };

    createTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to send OTP email" });
      }
      res.status(201).json({ message: "OTP has been sent to your email" });
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
}
