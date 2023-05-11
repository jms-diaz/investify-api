const router = require("express").Router();
const Enrollment = require("../models/Enrollment");

// get all enrollments
router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create a new enrollment
router.post("/", async (req, res) => {
  const enrollment = new Enrollment({
    user: req.body.user,
    course: req.body.course,
    enrolledAt: req.body.enrolledAt,
  });

  try {
    const newEnrollment = await enrollment.save();
    res.status(201).json(newEnrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update enrollment status
router.patch("/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (req.body.completed) {
      enrollment.completed = req.body.completed;
      enrollment.completedAt = new Date();
    }
    const updatedEnrollment = await enrollment.save();
    res.json(updatedEnrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
