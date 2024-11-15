import FormModel from "../model/FormModel.js";
import { v4 as uuidv4 } from "uuid";

export async function CreateForm(req, res) {
  console.log(req.body);
  const { userId, formName, email } = req.body;
  const formId = uuidv4(); // Generate a unique formId

  try {
    const newForm = new FormModel({ userId, formName, email, formId });
    await newForm.save();
    res.status(201).json({ formId, message: "Form created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
