import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  formId: { type: String, required: true },
  data: { type: Object, required: true },
  submittedAt: { type: Date, default: Date.now },
});
const SubmissionModel = mongoose.model("Submission", SubmissionSchema);
export default SubmissionModel;
