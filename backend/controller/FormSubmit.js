import FormModel from "../model/FormModel.js";
import SubmissionModel from "../model/SubmissionModel.js";
import nodemailer from "nodemailer"; // Ensure nodemailer is imported
import UserModel from "../model/UserModel.js";
export async function FormSubmit(req, res) {
  console.log(req.body);
  const { formId } = req.params;
  const submissionData = req.body;
  // const { id } = req.user;
  try {
    const formm = await FormModel.findOne({ formId });
    const user = await UserModel.findByIdAndUpdate(formm?.userId);
    if (user?.submissionsuse >= user.submissionlimit) {
      // return res.status(400).json({
      //   message: "You have reached your submission limit",
      //   error: true,
      // });
      return res
        .status(400)
        .redirect("http://localhost:3000/submission-limit-Reached");
    }
    // Find the form by formId
    const form = await FormModel.findOne({ formId });
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    if (!form?.active) {
      return res
        .status(400)
        .json({ message: "This form is currently inactive.", error: true });
    }
    // Save the submission data
    const submission = new SubmissionModel({ formId, data: submissionData });
    await submission.save();
    await user.submissionsuse++;
    await user.save();

    // Check if notifications are enabled
    if (form.notification) {
      const ownerEmail = form.email; // Assuming 'email' field exists in FormModel

      // Create transporter for sending the email
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

      // Email options
      const mailOptions = {
        from: "goodtimes4info@gmail.com",
        to: ownerEmail,
        subject: "New Form Submission Notification",
        text: `Hello,

Someone has submitted a response to your form "${form?.formName}".

Below are the submission details:

${JSON.stringify(submissionData, null, 2)}

Thank you for choosing our service!

Best regards,  
Your Team`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
          return res
            .status(500)
            .json({ message: "Failed to send notification email" });
        }
        console.log("Email sent: " + info.response);
      });
    }

    // res.status(201).json({ message: "Form submitted successfully"});
    res.status(200).redirect("http://localhost:3000/thankyousubmiting");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
}
