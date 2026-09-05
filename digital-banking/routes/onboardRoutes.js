const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const { insertBvn, insertNin } = require("../services/nibssService");

router.post("/onboard", async (req, res) => {
  const { email, firstName, lastName, dob, kycType, kycID, phone } = req.body;

  try {
    const existing = await Customer.findOne({
      $or: [{ email }, { kycID }],
    });

    if (existing) {
      return res.status(409).json({
        message: "A customer with this email or ID already exists",
      });
    }

    if (kycType === "bvn") {
      await insertBvn({ bvn: kycID, firstName, lastName, dob, phone });
    } else if (kycType === "nin") {
      await insertNin({ nin: kycID, firstName, lastName, dob });
    } else {
      return res
        .status(400)
        .json({ message: "kycType must be 'bvn' or 'nin'" });
    }

    const customer = await Customer.create({
      email,
      firstName,
      lastName,
      dob,
      kycType,
      kycID,
    });

    res.status(201).json({
      message: "Customer onboarded successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Onboarding failed",
      error: error.response ? error.response.data : error.message,
    });
  }
});

module.exports = router;
