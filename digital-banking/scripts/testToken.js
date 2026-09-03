

require('dotenv').config();
const { getValidToken } = require('../services/nibssAuth');

async function testIt() {
  console.log("--- First call ---");
  const token1 = await getValidToken();

  console.log("--- Second call (should reuse) ---");
  const token2 = await getValidToken();

  console.log("Same token both times?", token1 === token2);
}

testIt();