const router = require("express").Router();
const Payment = require("../models/Payment");

// create a new payment
router.post("/", async (req, res) => {
  try {
    const { userId, courseId, amount } = req.body;
    const payment = new Payment({
      userId,
      courseId,
      amount,
      paymentDate: new Date(),
    });
    await payment.save();
    res.status(201).json({ message: "Payment created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// get a list of all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// get a specific payment by ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// get all payments of a user
router.get("/user/:userId", async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId });
    res.json(payments);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

module.exports = router;
