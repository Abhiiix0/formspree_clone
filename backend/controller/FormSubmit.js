import FormModel from "../model/FormModel.js";
import SubmissionModel from "../model/SubmissionModel.js";

export async function FormSubmit(req, res) {
  console.log(req.body);
  const { formId } = req.params;
  const submissionData = req.body;
  // const datas = { ...submissionData, date: Date.now() };
  try {
    const form = await FormModel.findOne({ formId });
    if (!form) return res.status(404).json({ message: "Form not found" });

    // Save the submission data
    const submission = new SubmissionModel({ formId, data: submissionData });
    await submission.save();
    // res.redirect("https://formspree.io/thanks?language=en");
    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
}
