import express from "express";
import { Registration } from "../controller/Registraion.js";
import { OtpVerify } from "../controller/OtpVerify.js";
import { Login } from "../controller/Login.js";
import { UserDetail } from "../controller/UserDetail.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { CreateForm } from "../controller/CreateForm.js";
import { FormSubmit } from "../controller/FormSubmit.js";
import { GetAllForm } from "../controller/GetAllForm.js";
import { GetFormSubmission } from "../controller/GetFormSubmission.js";
import { DeleteFrom } from "../controller/DeleteForm.js";
import { DeleteSubmission } from "../controller/DeleteSubmission.js";
import decryptMiddleware from "../middleware/DecryptMiddleware.js";
import { UpdateForm } from "../controller/UpdateForm.js";
import { GetSingleForm } from "../controller/GetSingleForm.js";
import { UserDetailUpdate } from "../controller/UserDetialUpdate.js";
import { DeleteAccount } from "../controller/DeleteAccount.js";
import { SendOtp } from "../controller/SendOtp.js";
import { ResetPassword } from "../controller/ResetPassword.js";

const router = express.Router();
router.post("/formdata", verifyToken, GetFormSubmission);
router.post("/forgetpassword", decryptMiddleware, SendOtp);
router.post("/registration", Registration);
router.post("/resetPassword", ResetPassword);
router.post("/otp-verify", OtpVerify);
router.post("/get-single-form", verifyToken, GetSingleForm);
router.post("/updateform", verifyToken, UpdateForm);
router.post("/login", decryptMiddleware, Login);
router.delete("/deleteform", verifyToken, DeleteFrom);
router.post("/delete-account", verifyToken, DeleteAccount);
router.delete("/deletesubmission", verifyToken, DeleteSubmission);
router.get("/getuserdetails", verifyToken, UserDetail);
router.put("/update-userdetails", verifyToken, UserDetailUpdate);
router.post("/create-form", verifyToken, decryptMiddleware, CreateForm);
router.post("/:formId", FormSubmit);
router.get("/forms", verifyToken, GetAllForm);
export default router;
