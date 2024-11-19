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

const router = express.Router();
router.post("/formdata", GetFormSubmission);
router.post("/registration", Registration);
router.post("/otp-verify", OtpVerify);
router.post("/updateform", verifyToken, UpdateForm);
router.post("/login", decryptMiddleware, Login);
router.delete("/deleteform", DeleteFrom);
router.delete("/deletesubmission", DeleteSubmission);
router.get("/getuserdetails", verifyToken, UserDetail);
router.post("/create-form", decryptMiddleware, CreateForm);
router.post("/:formId", FormSubmit);
router.get("/forms", verifyToken, GetAllForm);

export default router;
