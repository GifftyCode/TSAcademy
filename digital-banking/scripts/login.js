require("dotenv").config();

const axios = require("axios");

async function login() {
  try {
    const response = await axios.post(
      `${process.env.NIBSS_BASE_URL}/api/auth/token`,
      {
        apiKey: `${process.env.NIBSS_API_KEY}`,
        apiSecret: `${process.env.NIBSS_API_SECRET}`,
      },
    );

    console.log("Login successful");
    console.log("Token: ", response.data.token);
    console.log("Fintech Info: ", response.data.fintech);
  } catch (error) {
    console.log("Login Failed...");
    console.log(error.response ? error.response.data : error.message);
  }
}

login();
