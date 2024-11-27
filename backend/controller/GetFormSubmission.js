import SubmissionModel from "../model/SubmissionModel.js";

export async function GetFormSubmission(req, res) {
  console.log("run");
  const { formId } = req.body;
  console.log("form", formId);
  try {
    const submissions = await SubmissionModel.find({ formId }).select(
      " -formId -__v"
    );
    const formattedData = submissions.map((submission) => {
      // Extract dynamic fields from submission.data
      const dynamicFields = Object.keys(submission.data);

      // Build an object with dynamic fields and add the key and submittedAt
      const submissionDetails = dynamicFields.reduce((acc, field) => {
        acc[field] = submission.data[field]; // Add each field dynamically
        return acc;
      }, {});

      // Add additional fields like key and submittedAt
      return {
        ...submissionDetails, // Include all dynamic fields
        id: submission._id,
        submittedAt: new Date(submission.submittedAt).toLocaleString(),
      };
    });
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
