import SubmissionModel from "../model/SubmissionModel.js";

export async function DeleteSubmission(req, res) {
  const { id } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const deleted = await SubmissionModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
}
