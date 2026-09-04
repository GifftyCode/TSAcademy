const axios = require("axios");
const { getValidToken } = require("./nibssAuth");

const BASE_URL = process.env.NIBSS_BASE_URL;

async function authHeaders() {
  const token = await getValidToken();

  return { Authorization: `Bearer ${token}` };
}

async function insertBvn({ bvn, firstName, lastName, dob, phone }) {
  const headers = await authHeaders();
  const response = await axios.post(
    `${BASE_URL}/api/insertBvn`,
    { bvn, firstName, lastName, dob, phone },
    { headers },
  );
  return response.data;
}

async function insertNin({ nin, firstName, lastName, dob }) {
  const headers = await authHeaders();
  const response = await axios.post(
    `${BASE_URL}/api/insertNin`,
    { nin, firstName, lastName, dob },
    { headers },
  );
  return response.data;
}

async function createAccount({ kycType, kycID, dob }) {
  const headers = await authHeaders();
  const response = await axios.post(
    `${BASE_URL}/api/account/create`,
    { kycType, kycID, dob },
    { headers },
  );

  return response.data;
}

async function nameEnquiry(accountNumber) {
  const headers = await authHeaders();
  const response = await axios.get(
    `${BASE_URL}/api/account/name-enquiry/${accountNumber}`,
    { headers },
  );
  return response.data;
}

async function transfer({ from, to, amount }) {
  const headers = await authHeaders();
  const response = await axios.post(
    `${BASE_URL}/api/transfer`,
    { from, to, amount },
    { headers },
  );
  return response.data;
}

async function getBalance(accountNumber) {
  const headers = await authHeaders();
  const response = await axios.get(
    `${BASE_URL}/api/account/balance/${accountNumber}`,
    { headers },
  );
  return response.data;
}

async function getTransactionStatus(transactionId) {
  const headers = await authHeaders();
  const response = await axios.get(
    `${BASE_URL}/api/transaction/${transactionId}`,
    { headers },
  );
  return response.data;
}

async function validateBvn(bvn) {
  const headers = await authHeaders();
  const response = await axios.post(
    `${BASE_URL}/api/validateBvn`,
    { bvn },
    { headers },
  );
  return response.data;
}

async function validateNin(nin) {
  const headers = await authHeaders();
  const response = await axios.post(
    `${BASE_URL}/api/validateNin`,
    { nin },
    { headers },
  );
  return response.data;
}

module.exports = {
  insertBvn,
  insertNin,
  createAccount,
  nameEnquiry,
  transfer,
  getBalance,
  getTransactionStatus,
  validateBvn,
  validateNin,
};
