const express = require("express");

const app = express();

app.use(express.json());

const PORT = 8080;

const students = [];

// Add a new student
app.post("/api/students", (req, res) => {
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
    grade: 0,
    enrollmentDate: new Date(),
  };

  students.push(newStudent);
  res.status(201).json({
    status: "success",
    message: "Student created successfully.",
    student: newStudent,
  });
});

// Get all students
app.get("/api/students", (req, res) => {
  if (students.length < 1)
    return res.status(404).json({
      status: "fail",
      message: "No student found... Create a student first!",
    });
  res.status(200).json(students);
});

// Get a student by ID
app.get("/api/students/:id", (req, res) => {
  const id = req.params.id;

  const student = students.find((student) => student.studentId === id);

  if (!student) {
    return res.status(404).json({
      status: "fail",
      message: "Student not found!",
    });
  }

  res.status(200).json(student);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
