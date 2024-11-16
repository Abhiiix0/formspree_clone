import FormModel from "../model/FormModel.js";

export async function GetAllForm(req, res) {
  const { id } = req.user;
  console.log(id);
  try {
    const forms = await FormModel.find({ userId: id });
    return res.status(200).json({
      message: "Forms retrieved successfully",
      data: forms,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
}
