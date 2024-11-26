import SubmissionModel from "../model/SubmissionModel.js";

export async function GetFormSubmission(req, res) {
  console.log("run");
  const { formId } = req.body;
  console.log("form", formId);
  try {
    const submissions = await SubmissionModel.find({ formId }).select(
      " -formId -__v"
    );
    const formattedData = submissions.map((submission, index) => ({
      key: submission._id,
      email: submission.data.email,
      message: submission.data.message,
      date: new Date(submission.data.date).toLocaleString(), // Convert timestamp to readable format
      submittedAt: new Date(submission.submittedAt).toLocaleString(),
    }));
    // console.log(submissions);
    return res.status(200).json({
      data: formattedData,
      message: "Submissions retrieved successfully",
    });
  } catch (error) {
    // console.error(error);
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
}
