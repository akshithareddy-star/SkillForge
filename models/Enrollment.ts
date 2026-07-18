import mongoose, { Schema, models, model } from "mongoose";

const EnrollmentSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },

    courseId: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    instructor: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Enrollment ||
  model("Enrollment", EnrollmentSchema);