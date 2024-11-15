import UserModel from "../model/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export async function Login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(499)
        .json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Account Not Found" });
    }
    if (user?.active === false) {
      return res.status(401).json({ message: "Account is inactive" });
    }
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const tokenData = {
      id: user?._id,
      email: user?.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRETKEY, {
      expiresIn: "7d",
    });

    const cookieOption = {
      http: true,
      secure: true,
      sameSite: "None",
      // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
    };
    res.cookie("token", token, cookieOption).status(200).json({
      message: "Login Successfully",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      message: error?.message || "something went wrong",
    });
  }
}
