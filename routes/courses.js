const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// get single course by ID
router.get("/:courseId", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// create a new course
router.post("/", async (req, res) => {
  try {
    const { title, description, instructor, price } = req.body;
    const course = new Course({
      title,
      description,
      instructor,
      price,
    });
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// update an existing course by ID
router.put("/:courseId", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const { title, description, instructor, price } = req.body;
    course.title = title;
    course.description = description;
    course.instructor = instructor;
    course.price = price;
    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// delete a course by ID
router.delete("/:courseId", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

module.exports = router;
