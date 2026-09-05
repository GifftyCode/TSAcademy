// server.js

require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Digital Banking API is alive and well" });
});

const onboardRoutes = require("./routes/onboardRoutes");
const accountRoutes = require("./routes/accountRoutes");
const bankingRoutes = require("./routes/bankingRoutes");

app.use("/api", onboardRoutes);
app.use("/api", accountRoutes);
app.use("/api", bankingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
