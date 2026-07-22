const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

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

// Update student information
app.patch("/api/students/:id", (req, res) => {
  const { id } = req.params;

  const student = students.find((student) => student.studentId === id);

  if (!student) return res.status(404).json({ error: "Student not found!" });

  Object.assign(student, req.body);

  res.status(201).json(student);
});

// Delete a student
app.delete("/api/students/:id", (req, res) => {
  const { id } = req.params;
  const studentIndex = students.findIndex(
    (student) => student.studentId === id,
  );

  if (studentIndex === -1) {
    return res.status(404).json({ error: "Student not found!" });
  }

  students.splice(studentIndex, 1);
  res.status(200).json({ message: "Student deleted successfully." });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
