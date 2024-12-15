// const express = require('express');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
import nodemailer from "nodemailer";
const app = express();
app.use(express.json());

// Replace this with your database (mock implementation here)
let otpStore = {}; // In-memory OTP storage (use a database in production)

// Send OTP API
app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required.");
  }

  try {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in the mock store (replace this with database logic)
    otpStore[email] = { otp, otpExpiry };

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com", // Replace with your email
        pass: "your-password", // Replace with your email's app password
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).send("OTP sent to your email.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send OTP. Please try again.");
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
