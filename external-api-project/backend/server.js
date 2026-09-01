const express = require("express");

const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Our backend is working..." });
});

app.listen(PORT, (req, res) => {
  console.log(`Serving is running on port ${PORT}`);
});
