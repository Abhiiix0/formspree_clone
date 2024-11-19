import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  formName: { type: String, required: true },
  formId: { type: String, unique: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  active: {
    type: Boolean,
    default: true,
  },
  notification: {
    type: Boolean,
    default: true,
  },
});
const FormModel = mongoose.model("Form", FormSchema);
export default FormModel;
