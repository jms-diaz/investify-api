const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const userRoute = require("./routes/users");
const instructorRoute = require("./routes/instructors");
const enrollmentRoute = require("./routes/enrollments");
const courseRoute = require("./routes/courses");
const contentRoute = require("./routes/contents");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to mongodb"))
  .catch((err) => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/instructors", instructorRoute);
app.use("/api/enrollments", enrollmentRoute);
app.use("/api/courses", courseRoute);
app.use("/api/courses", contentRoute);

app.listen("5000", () => {
  console.log("backend is running");
});
