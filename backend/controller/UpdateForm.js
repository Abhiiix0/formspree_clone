import FormModel from "../model/FormModel.js";

export async function UpdateForm(req, res) {
  const { formId, email, formName, active, notification } = req.body;
  console.log("data", req.body);
  if (!formId) {
    return res.status(400).json({ message: "Form ID is required" });
  }

  try {
    // Build the update object dynamically
    const updateFields = {};
    const updatedFields = []; // To track which fields are updated

    if (email !== undefined) {
      updateFields.email = email;
      updatedFields.push("email");
    }
    if (formName !== undefined) {
      updateFields.formName = formName;
      updatedFields.push("form name");
    }
    if (active !== undefined) {
      updateFields.active = active;
      updatedFields.push("form enable status");
    }
    if (notification !== undefined) {
      updateFields.notification = notification;
      updatedFields.push("email notifications");
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const updatedForm = await FormModel.findOneAndUpdate(
      { formId: formId }, // Query by form ID
      { $set: updateFields }, // Update only the specified fields
      { new: true } // Return the updated document
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Construct the response message based on the updated fields
    let responseMessage;
    if (updatedFields.length === 1) {
      responseMessage = `${updatedFields[0]} updated successfully.`;
    } else {
      responseMessage = `Form settings updated successfully (${updatedFields.join(
        ", "
      )}).`;
    }

    return res.status(200).json({
      message: responseMessage,
      data: updatedForm,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
}
