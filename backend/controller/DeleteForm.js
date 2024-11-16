import FormModel from "../model/FormModel.js";
import SubmissionModel from "../model/SubmissionModel.js";

export async function DeleteFrom(req, res) {
  const { formId } = req.body;
  console.log(formId);
  try {
    if (!formId) {
      return res.status(400).json({ message: "ID is required" });
    }
    const deleted = await FormModel.findOneAndDelete({ formId });
    await SubmissionModel.deleteMany({ formId: formId });
    if (!deleted) {
      return res.status(404).json({ message: "Form not found" });
    }
    return res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
}
