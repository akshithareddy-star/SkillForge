import mongoose, { Schema, models, model } from "mongoose";

const ProgressSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    courseId: {
      type: Number,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      default: 0,
    },
    completedLessons: {
      type: Number,
      default: 0,
    },
    totalLessons: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Progress || model("Progress", ProgressSchema);