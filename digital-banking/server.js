require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const onboardRoutes = require("./routes/onboardRoutes");
const accountRoutes = require("./routes/accountRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use("/api", onboardRoutes);
app.use("/api", accountRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Digital Banking API is alive and well" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
