require("dotenv").config();
const axios = require("axios");

const onboardFintech = async () => {
  try {
    const response = await axios.post(
      `${process.env.NIBSS_BASE_URL}/api/fintech/onboard`,
      { name: "Azia Coporative", email: "ulokangozi@gmail.com" },
    );
    console.log("Onboarding successful");
    console.log(response.data);
  } catch (error) {
    console.log("Onboarding failed");
    console.log(error.response ? error.response.data : error.message);
  }
};
onboardFintech();
