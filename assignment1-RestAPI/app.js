const express = require("express");

const app = express();

app.use(express.json());

const PORT = 8080;

const students = [];

// Create a student
app.post("/api/v1/students", (req, res) => {
  const nextId = students.length + 1;
  const { firstName, lastName, gender, email, course, enrollmentDate } =
    req.body;

  if (!firstName || !lastName || !gender || !email || !course)
    return res.status(400).send("All fields are required.");

  const newStudent = {
    studentId: `TSA${new Date().getFullYear()}${String(nextId).padStart(4, "0")}`,
    firstName,
    lastName,
    gender,
    email,
    course,
    enrollmentDate: new Date(),
  };

  students.push(newStudent);
  res.status(201).json({
    status: "success",
    message: "Student created successfully.",
    student: newStudent,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
