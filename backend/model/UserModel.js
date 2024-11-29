import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    submissionsuse: {
      type: Number,
      default: 0,
    },
    submissionlimit: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
