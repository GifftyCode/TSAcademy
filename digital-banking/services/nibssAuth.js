// services/nibssAuth.js

const axios = require("axios");

// Module-level variables — created once, shared by every function below,
// and kept alive as long as the server is running.
let cachedToken = null;
let tokenExpiry = null; // Unix timestamp in seconds

async function loginToNibss() {
  const response = await axios.post(
    `${process.env.NIBSS_BASE_URL}/api/auth/token`,
    {
      apiKey: process.env.NIBSS_API_KEY,
      apiSecret: process.env.NIBSS_API_SECRET,
    },
  );

  const token = response.data.token;

  // Decode the JWT payload ourselves to read the real "exp" claim.
  // A JWT looks like: header.payload.signature
  const payloadBase64 = token.split(".")[1];
  const payloadJson = Buffer.from(payloadBase64, "base64").toString("utf-8");
  const payload = JSON.parse(payloadJson);

  cachedToken = token;
  tokenExpiry = payload.exp; // seconds since epoch

  console.log(
    "Logged in fresh. Token expires at:",
    new Date(tokenExpiry * 1000),
  );

  return cachedToken;
}

async function getValidToken() {
  const nowInSeconds = Math.floor(Date.now() / 1000);

  // If we have a token AND it hasn't expired yet (with a 30s safety buffer)
  if (cachedToken && tokenExpiry && nowInSeconds < tokenExpiry - 30) {
    console.log("Reusing cached token.");
    return cachedToken;
  }

  // Otherwise, log in fresh
  return await loginToNibss();
}

module.exports = { getValidToken };
