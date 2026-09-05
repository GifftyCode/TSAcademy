const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const Transaction = require("../models/Transaction");
const {
  nameEnquiry,
  transfer,
  getBalance,
  getTransactionStatus,
} = require("../services/nibssService");

router.get("/account/name-enquiry/:accountNumber", async (req, res) => {
  try {
    const data = await nameEnquiry(req.params.accountNumber);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Name enquiry failed",
      error: error.response ? error.response.data : error.message,
    });
  }
});

router.get("/account/balance", async (req, res) => {
  const { email } = req.query;

  try {
    const customer = await Customer.findOne({ email });

    if (!customer || !customer.accountNumber) {
      return res
        .status(404)
        .json({ message: "No account found for this customer." });
    }

    const data = await getBalance(customer.accountNumber);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Balance check failed",
      error: error.response ? error.response.data : error.message,
    });
  }
});

router.post("/transfer", async (req, res) => {
  const { email, to, amount } = req.body;

  try {
    const sender = await Customer.findOne({ email });

    if (!sender || !sender.accountNumber) {
      return res.status(404).json({ message: "Sender has no account." });
    }

    const nibssResponse = await transfer({
      from: sender.accountNumber,
      to,
      amount,
    });

    await Transaction.create({
      transactionId: nibssResponse.transactionId,
      fromAccount: nibssResponse.from,
      toAccount: nibssResponse.to,
      amount: nibssResponse.amount,
      status: nibssResponse.status,
      ownerAccount: sender.accountNumber,
    });

    res.status(200).json(nibssResponse);
  } catch (error) {
    res.status(500).json({
      message: "Transfer failed",
      error: error.response ? error.response.data : error.message,
    });
  }
});

router.get("/transaction/:transactionId", async (req, res) => {
  const { email } = req.query;
  const { transactionId } = req.params;

  try {
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    const localRecord = await Transaction.findOne({
      transactionId,
      ownerAccount: customer.accountNumber,
    });

    if (!localRecord) {
      return res
        .status(403)
        .json({ message: "You do not have access to this transaction." });
    }

    const liveStatus = await getTransactionStatus(transactionId);
    res.status(200).json(liveStatus);
  } catch (error) {
    res.status(500).json({
      message: "Transaction status check failed",
      error: error.response ? error.response.data : error.message,
    });
  }
});

router.get("/transactions", async (req, res) => {
  const { email } = req.query;

  try {
    const customer = await Customer.findOne({ email });

    if (!customer || !customer.accountNumber) {
      return res
        .status(404)
        .json({ message: "No account found for this customer." });
    }

    const history = await Transaction.find({
      ownerAccount: customer.accountNumber,
    }).sort({ createdAt: -1 });

    res.status(200).json({ transactions: history });
  } catch (error) {
    res.status(500).json({
      message: "Fetching transaction history failed",
      error: error.message,
    });
  }
});

module.exports = router;
