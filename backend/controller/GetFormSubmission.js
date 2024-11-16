import SubmissionModel from "../model/SubmissionModel.js";

export async function GetFormSubmission(req, res) {
  console.log("run");
  const { formId } = req.body;
  console.log("form", formId);
  try {
    const submissions = await SubmissionModel.find({ formId }).select(
      " -formId -__v"
    );
    // console.log(submissions);
    return res.status(200).json({
      data: submissions,
      message: "Submissions retrieved successfully",
    });
  } catch (error) {
    // console.error(error);
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
}
