import FormModel from "../model/FormModel.js";

export async function GetSingleForm(req, res) {
  const { id } = req.body;
  const user = req.user;
  console.log(id);
  try {
    const forms = await FormModel.findOne({ _id: id, userId: user.id });
    console.log("forms", forms);
    if (!forms) {
      return res.status(404).json({
        message: "Form not found",
        error: true,
      });
    }
    return res.status(200).json({
      message: "Fetch Form Data",
      data: forms,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: error?.message || "Internal Server Error" });
  }
}
