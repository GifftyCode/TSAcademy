const express = require("express");
require("dotenv").config(); // Load environment variables from .env file
const connectDB = require("./Config/db");

const app = express();
connectDB(); // connect to MongoDB

app.use(express.json());

const PORT = process.env.PORT;

const productRoute = require("./Routes/ProductRoute");
const userRoute = require("./Routes/UserRoute");

app.use("/products", productRoute);
app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
