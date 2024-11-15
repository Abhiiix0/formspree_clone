import express from "express";
import { Registration } from "../controller/Registraion.js";
import { OtpVerify } from "../controller/OtpVerify.js";
import { Login } from "../controller/Login.js";
import { UserDetail } from "../controller/UserDetail.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { CreateForm } from "../controller/CreateForm.js";

const router = express.Router();
router.post("/registration", Registration);
router.post("/otp-verify", OtpVerify);
router.post("/login", Login);
router.get("/getuserdetails", verifyToken, UserDetail);
router.post("/create-form", CreateForm);

export default router;
