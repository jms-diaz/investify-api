const router = require("express").Router();
const Certificate = require("../models/Certificate");

// create a new certificate
router.post("/", async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const certificate = new Certificate({
      userId,
      courseId,
      issuedDate: new Date(),
    });
    await certificate.save();
    res.status(201).json({ message: "Certificate created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// get a list of all certificates
router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// get a specific certificate by ID
router.get("/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.json(certificate);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// get all certificates of a user
router.get("/user/:userId", async (req, res) => {
  try {
    const certificates = await Certificate.find({ userId: req.params.userId });
    res.json(certificates);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

module.exports = router;
