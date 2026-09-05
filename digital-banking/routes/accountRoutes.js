const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const { createAccount } = require("../services/nibssService");

router.post("/account/create", async (req, res) => {
  const { email } = req.body;

  try {
    const existing = await Customer.findOne({ email });

    if (!existing) {
      return res.status(404).json({ message: "Customer hasn't onboarded yet" });
    }

    if (existing.accountNumber) {
      return res
        .status(409)
        .json({ message: "Customer already has an account" });
    }

    const nibssResponse = await createAccount({
      kycType: existing.kycType,
      kycID: existing.kycID,
      dob: existing.dob,
    });

    existing.accountNumber = nibssResponse.accountNumber;
    await existing.save();

    res.status(201).json({
      message: "Account created successfully",
      account: nibssResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Account creation failed",
      error: error.response ? error.response.data : error.message,
    });
  }
});

module.exports = router;
