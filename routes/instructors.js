const router = require("express").Router();
const Instructor = require("../models/Instructor");

// get instructor
router.get("/:id", async (req, res) => {
  try {
    const user = await Instructor.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {}
});

// create instructor
router.post("/", async (req, res) => {
  const newInstructor = new Instructor(req.body);
  try {
    const savedInstructor = await newInstructor.save();
    res.status(200).json(savedInstructor);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// update instructor details
router.put("/:id", async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (instructor.name === req.body.name) {
      try {
        const updatedInstructor = await Instructor.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        res.status(200).json(updatedInstructor);
      } catch (err) {
        res.status(500).json(err.message);
      }
    } else {
      res.status(401).json("Instructor cannot be updated!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// delete instructor account
router.delete("/:id", async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (instructor.username === req.body.username) {
      try {
        await instructor.delete();
        res.status(200).json("Instructor has been deleted");
      } catch (err) {
        res.status(500).json(err.message);
      }
    } else {
      res.status(401).json("Instructor cannot be deleted!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
