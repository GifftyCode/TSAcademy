const express = require("express");

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("My server is running...");
});

app.get("/api/users", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
