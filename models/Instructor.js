const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
  name: String,
  bio: String,
});

module.exports = mongoose.model("Instructor", InstructorSchema);
