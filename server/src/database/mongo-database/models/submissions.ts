// Packages
import { model, Schema } from "mongoose";

const schema = new Schema({
  assignmentId: {
    type: String,
    required: true,
  },

  studentId: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: new Date(),
  },

  grade: {
    type: Number,
    default: 0,
  },

  file: {
    type: String,
    default: "",
  },
});

export const SubmissionModel = model("Submission", schema);
