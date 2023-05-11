const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  dateUpdated: {
    type: Date,
    required: true,
  },
  enrollments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enrollment",
    },
  ],
  contents: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
    },
  ],
});
module.exports = mongoose.model("Course", courseSchema);
