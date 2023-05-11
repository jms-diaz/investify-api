const router = require("express").Router();
const Course = require("../models/Course");

// get course contents
router.get("/:courseId/contents", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course.contents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// get a specific content for a course
router.get("/:courseId/contents/:contentId", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const content = course.contents.find((c) => c.id === req.params.contentId);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// add contents to a course
router.post("/:courseId/contents", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const { title, description, order, url } = req.body;

    // Create a new content object
    const newContent = {
      title,
      description,
      order,
      url,
    };

    // Add the new content to the course contents array
    course.contents.push(newContent);

    // Save the updated course
    const updatedCourse = await course.save();

    res.status(201).json(updatedCourse);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// update a course content
router.put("/:courseId/contents/:contentId", async (req, res) => {
  const { title, description } = req.body;
  const updateContent = {
    title,
    description,
  };

  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const content = course.contents.find((c) => c.id === req.params.contentId);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    Object.assign(content, updateContent);
    await course.save();
    res.json(course.contents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a content for a course
router.delete("/:courseId/contents/:contentId", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    course.contents = course.contents.filter(
      (c) => c.id !== req.params.contentId
    );
    await course.save();
    res.json(course.contents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
